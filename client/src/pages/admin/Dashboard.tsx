import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  projectsAPI,
  experienceAPI,
  publicationsAPI,
  certificationsAPI,
} from '../../utils/api'

// Generic Form component for admin panel
const DynamicForm = ({ 
  schema, 
  onSubmit, 
  onCancel 
}: { 
  schema: Record<string, 'text' | 'textarea' | 'checkbox' | 'array'>, 
  onSubmit: (data: any) => void, 
  onCancel: () => void 
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl mt-4 space-y-4">
      <h3 className="text-lg font-bold text-slate-100">Add New Item</h3>
      {Object.entries(schema).map(([key, type]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-slate-400 capitalize mb-1">{key}</label>
          {type === 'textarea' ? (
            <textarea
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ) : type === 'checkbox' ? (
            <input
              type="checkbox"
              className="ml-2 accent-purple-500"
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          ) : type === 'array' ? (
            <input
              type="text"
              placeholder="Comma separated values"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              onChange={(e) => handleChange(key, e.target.value.split(',').map(s => s.trim()))}
            />
          ) : (
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="flex gap-4 pt-4">
        <button onClick={() => onSubmit(formData)} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">Save</button>
        <button onClick={onCancel} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">Cancel</button>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [data, setData] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)

  // Map tabs to APIs
  const apiMap: Record<string, any> = {
    projects: projectsAPI,
    experience: experienceAPI,
    publications: publicationsAPI,
    certifications: certificationsAPI,
  }

  // Schemas for the forms
  const schemaMap: Record<string, any> = {
    projects: { title: 'text', description: 'textarea', techStack: 'array', githubUrl: 'text', liveUrl: 'text', featured: 'checkbox', category: 'text' },
    experience: { company: 'text', role: 'text', duration: 'text', location: 'text', type: 'text', current: 'checkbox', description: 'array' },
    publications: { title: 'text', type: 'text', conference: 'text', date: 'text', authors: 'array', abstract: 'textarea', link: 'text' },
    certifications: { name: 'text', issuer: 'text', date: 'text', category: 'text', credentialUrl: 'text' },
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      const res = await apiMap[activeTab].getAll()
      setData(res.data)
    } catch (err) {
      console.error(err)
      if ((err as any).response?.status === 401) {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await apiMap[activeTab].delete(id)
      loadData()
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  const handleCreate = async (formData: any) => {
    try {
      await apiMap[activeTab].create(formData)
      setIsAdding(false)
      loadData()
    } catch (err) {
      console.error(err)
      alert('Create failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Manage portfolio content directly in the database.</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-800 pb-2 overflow-x-auto">
          {Object.keys(apiMap).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setIsAdding(false) }}
              className={`px-5 py-2 rounded-t-lg capitalize font-medium transition-colors ${
                activeTab === tab ? 'bg-purple-600/20 text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-100 capitalize">Manage {activeTab}</h2>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm shadow-glow-sm"
              >
                + Add New
              </button>
            )}
          </div>

          {isAdding && (
            <DynamicForm 
              schema={schemaMap[activeTab]} 
              onSubmit={handleCreate} 
              onCancel={() => setIsAdding(false)} 
            />
          )}

          {!isAdding && (
            <div className="space-y-4">
              {data.map((item, idx) => (
                <div key={item._id || idx} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-200">
                      {item.title || item.company || item.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {item.description 
                        ? (Array.isArray(item.description) ? item.description[0] : item.description).slice(0, 100) + '...'
                        : item.role || item.issuer || item.abstract?.slice(0,100)}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {data.length === 0 && <p className="text-slate-500 text-center py-8">No {activeTab} found in database.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
