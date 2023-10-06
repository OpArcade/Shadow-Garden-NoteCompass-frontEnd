import React from 'react'
import Layout from '../../components/Layout/Layout'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import Notes from '../../components/notes/Notes'

const NotesHomepage = () => {
  return (
    <Layout>
        <MainDiv>
          <Heading>
              <h1>
                Notes
              </h1>
              <NotesAddButton to={"/notes/new/"}>
                <AiOutlinePlus/>  New Note
              </NotesAddButton>
          </Heading>
          <hr/>
          <NotesTable>
            <Notes/>
          </NotesTable>
        </MainDiv>
    </Layout>
  )
}

const NotesTable = styled.div`
  
`

const NotesAddButton = styled(Link)`
  text-decoration: none;
  background-color: #212121;
  color: white;
  padding: 1rem;
  display: flex;
  gap: .5rem;
  align-items: center;
  font-family: "Poppins", sans-serif;
  border-radius: .5rem;
  position: relative;
  top: -5px;
`

const Heading = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1{
    font-weight: 500;
    margin: 0 0 1rem 0;
  }
`

const MainDiv = styled.div`
  width: 100%;
  margin: 1rem;
  @media screen and (max-width:900px){
    margin : 0 1rem 1rem 1rem;
  }
  @media screen and (max-width:400px) {
    margin: 0;
  }
`

export default NotesHomepage