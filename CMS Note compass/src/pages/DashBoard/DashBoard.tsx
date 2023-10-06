import React from 'react'
import Layout from '../../components/Layout/Layout'
import styled from 'styled-components'
import UserDashBoard from '../../components/DashBoard/UserDashBoard'

const DashBoard = () => {
  return (
    <Layout>
        <MainDiv>
          <UserDashBoard/>
        </MainDiv>
    </Layout>
  )
}

const MainDiv = styled.div`
  
`

export default DashBoard;