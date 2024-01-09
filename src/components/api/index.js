import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const Api = () => {
  const [inputText, setInputText] = useState('')
  const [synonyms, setSynonyms] = useState([])
  const [loading, setLoading] = useState(false)

  const updateInputText = event => {
    setInputText(event.target.value)
  }

  const handleFindSynonyms = async event => {
    event.preventDefault()

    // Set loading to true when starting the API request
    setLoading(true)

    const apiEndpoint = `https://api.api-ninjas.com/v1/thesaurus?word=${inputText}`

    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'G4zuAPXRrrwx4y6mmtsKfw==8hKfXzzdqZUHcKSC',
        },
      })

      const data = await response.json()
      setSynonyms(data.synonyms || [])
    } catch (error) {
      console.error('Error fetching synonyms:', error)
    } finally {
      // Set loading to false when the API request is complete, regardless of success or failure
      setLoading(false)
      setInputText('')
    }
  }

  return (
    <>
      <h1>Synonym Finder</h1>
      <form onSubmit={handleFindSynonyms}>
        <input
          type="text"
          placeholder="Enter a word to find Synonyms"
          onChange={updateInputText}
          value={inputText}
        />
        <button type="submit" disabled={loading}>
          Find Synonyms
        </button>
      </form>
      <div>
        {loading && <div className="loader" />}
        {!loading && (
          <>
            <p>Synonyms:</p>
            <ul>
              {synonyms.slice(0, 5).map(synonym => (
                <li className="box" key={uuidv4()}>
                  {synonym}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Api
