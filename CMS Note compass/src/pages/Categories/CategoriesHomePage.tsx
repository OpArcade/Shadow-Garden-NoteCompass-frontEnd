import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { styled } from 'styled-components';
import CoursesSection from '../../components/Categories/CoursesSection';
import SubjectsSection from '../../components/Categories/SubjectsSection';

const CategoriesHomePage = () => {
    const [selectedCategory,setSelectedCategory] = useState<any>(0);

    return (
      <Layout>
          <MainDiv>
            <Heading>
              <h1>
                Categories
              </h1>
            </Heading>
              <CategoriesBar>
                  <button onClick={()=>setSelectedCategory(0)} className={selectedCategory === 0 ? 'activeButton' : 'notActiveButton'}>
                    Courses
                  </button>
                  <button onClick={()=>setSelectedCategory(1)} className={selectedCategory === 1 ? 'activeButton' : 'notActiveButton'}> 
                    Subjects
                  </button>
              </CategoriesBar>
             {selectedCategory === 0 && (
                <CoursesSection/>
             )} 
             {selectedCategory === 1 && (
                <SubjectsSection/>
             )}
          </MainDiv>
      </Layout>
    )
}

const CategoriesBar = styled.div`
  border-bottom: 2px solid black;
  width: 100%;
  button{
    font-family: "Poppins",sans-serif;
    border: none;
    margin: 1rem 1rem;
    padding: 1rem 1rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .activeButton{
    background-color: #d8d5f5;
  }
  .notActiveButton{
    background-color: transparent;
    &:hover{
      color: #0400ff;
    }
  }
`

const Heading = styled.div`
  font-family: "Poppins",sans-serif;
  h1{
    font-weight: 500;
    margin: 0 0 1rem 0;
  }
`

const MainDiv = styled.div`
  width : 100%;
  margin: 1rem 1rem 1rem 1rem;
  @media screen and (max-width:900px){
    margin : 0 1rem 1rem 1rem;
  }
  @media screen and (max-width:400px) {
    margin: 0;
  }
`


export default CategoriesHomePage