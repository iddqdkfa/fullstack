import React from 'react'


const Filter = ({handleSubmit, handleInput, handleNumber}) => {

    return (
        <form onSubmit = {handleSubmit} >
        <div>
          name: <input onChange = {handleInput} />
        </div>
        <div>
          number: <input onChange = {handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )

}

export default Filter