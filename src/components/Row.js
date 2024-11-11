import React from 'react';
import tasks from '../screens/Home';
import deleteTask from '../screens/Home';
export default function Row({item, deleteTask}) {
    return (
      <li key={item.id}>
        {item.description}
        <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
      </li>
    )
  }

    

