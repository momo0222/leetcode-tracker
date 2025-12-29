import { useState, useEffect } from 'react'
import { Editor } from "@monaco-editor/react"
import './App.css'

function App() {
  const [problems, setProblems] = useState([])
  const [currentProblem, setCurrentProblem] = useState({
    id: Date.now(),
    title: '',
    code: '//write your solution here',
    tags: [],
    difficulty: 'medium',
    notes: '',
    timestamp: new Date().toISOString()
  });
  const [view, setView] = useState('editor')

  useEffect(() => {
    const saved = localStorage.getItem('problems')
    if(saved){
      setProblems(JSON.parse(saved))
    }
  }, []);

  const saveProblem = () => {
    const updated = [...problems, currentProblem]
    setProblems(updated)
    localStorage.setItem('problems', JSON.stringify(updated))

    setCurrentProblem({
      id: Date.now(),
      title: '',
      code: '//write your solution here',
      tags: [],
      difficulty: 'medium',
      notes: '',
      timestamp: new Date().toISOString()
    });

    alert('Problem saved!')
  };

  const loadProblem = (problem) => {
    setCurrentProblem(problem)
    setView('editor')
  };
  return (
    <div className="App">
      <nav style={{padding: '20px', background: "#282c34", color: 'white'}}>
        <h1>Leetcode Tracker</h1>
        <button onClick={() => setView('editor')}>Editor</button>
        <button onClick={() => setView('list')}>My problems</button>
      </nav>
      {view === 'editor' ? (
        <div style={{padding: '20px'}}> 
          <input
          type='text'
          placeholder='Problem Title'
          value={currentProblem.title}
          onChange={(e) => setCurrentProblem({...currentProblem, title: e.target.value})}
          style={{width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px'}}
          />

          <select
          value={currentProblem.difficulty}
          onChange={(e) => setCurrentProblem({...currentProblem, difficulty: e.target.value})}
          style={{padding: '10px', marginBottom: '10px'}}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div style={{ marginBottom: '10px' }}>
            <input 
              type='text'
              placeholder='Add tags (comma separated): arrays, hashtable, trees'
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  const tags = e.target.value.split(',').map(t => t.trim())
                  setCurrentProblem({...currentProblem, tags})
                  e.target.value = ''
                }
              }}
              style={{ width: '100%', padding: '10px' }}
            />
            <div style={{ marginTop: '5px' }}>
              {currentProblem.tags.map(tag => (
                <span 
                  key={tag}
                  style={{
                    background: '#61dafb',
                    display: 'inline-block',
                    padding: '5px 10px', 
                    margin: '5px', 
                    borderRadius: '5px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Editor
            height="400px"
            defaultLanguage="python"
            theme="vs-dark"
            value={currentProblem.code}
            onChange={(value) => setCurrentProblem({...currentProblem, code: value})}
          />

          <textarea
            placeholder='Notes: what did you learn? Mistakes? Time complexity?'
            value={currentProblem.notes}
            onChange={(e) => setCurrentProblem({...currentProblem, notes: e.target.value})}
            style={{
              width: '100%',
              height: '100px',
              marginTop: '10px',
              padding: '10px',
              fontSize: '14px'
            }}  
          >
          
          </textarea>
          <button
            onClick={saveProblem}
            style={{
              marginTop: '10px',
              padding: '15px 30px',
              fontSize: '16px',
              background: '#61dafb',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            Save Problem
          </button>
        </div>
      ):(
        <div style={{padding: '20px'}}>
          <h2>My Problems ({problems.length})</h2>
          {problems.length === 0 ? (
            <p>No problems saved yet. Go solve some</p>
          ):(
            problems.map(problem => (
              <div
                key={problem.id}
                onClick={() => loadProblem(problem)}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  background: '#a6a6a6ff'
                }}
              >
                <h3>{problem.title || 'Untitled Problem' }</h3>
                <p>Difficulty: {problem.difficulty} | Tags: {problem.tags.join(',')}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(problem.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )

      }
    </div>
  )
}

export default App
