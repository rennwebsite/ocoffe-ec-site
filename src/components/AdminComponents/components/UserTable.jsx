import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const UserTable = ({ user, delUser }) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.role}</td>
          <td>
            {user.status == 'active' ? (
              <span className='bg-success text-white text-sm px-2 p-1 rounded-4'>
                {user.status}
              </span>
            ) : (
              user.status
            )}
          </td>
          <td>
            <Button
              className='m-0 text-white'
              variant='danger'
              size='sm'
              onClick={() => delUser(user.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default UserTable
