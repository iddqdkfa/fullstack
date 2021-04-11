import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

test('<NewBlog /> updates parent state and calls onSubmit', () => {
    
  const createNote = jest.fn()

 let  title2 = "mytitle" 
  let author2 = "Jeff" 
  let url2 ="fake.com"

  let changeTitle = (click) => {
      console.log("click is", click)
      title2 = click}

  const component = render(
    <NewBlog handleCreate={createNote} title = {title2} setTitle = {changeTitle} author = {author2} url= {url2}/>
  )

  

  const author = component.container.querySelector('#author')
  const titleComp = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  console.log(titleComp);

  component.debug()
  
  console.log("Title is", title2)

  fireEvent.change(titleComp, { 
    target: { value: 'mytitle2' } 
  })

  console.log("Title is", title2)

  /*
  fireEvent.change(author, { 
    target: { value: 'George' } 
  })

  fireEvent.change(url, { 
    target: { value: 'faker.com' } 
  })
  
*/
  
  fireEvent.submit(form)

  console.log("Mock call is", createNote.mock.calls[0][0].target )

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].author).toBe('Jeff' )
 // expect(createNote.mock.calls[0][0].title).toBe('mytitle2' )
  //expect(createNote.mock.calls[0][2].content).toBe('faker.com' )


})