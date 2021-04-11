import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'jeff',
    url: 'fake.com',
    likes: '3',
    title: 'mytitle'
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'jeff'
  )

  expect(component.container).toHaveTextContent(
    'mytitle'
  )
  
  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle('display: none')

})


test('clicking the button calls event handler once', () => {
    const blog = {
        author: 'jeff',
        url: 'fake.com',
        likes: '3',
        title: 'mytitle'
      }
    
      const component = render(
        <Blog blog={blog} />
      )
  
    const button = component.getByText('View')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: block')
    expect(component.container).toHaveTextContent(
        '3'
      )
    
      expect(component.container).toHaveTextContent(
        'fake.com'
      )
  })
