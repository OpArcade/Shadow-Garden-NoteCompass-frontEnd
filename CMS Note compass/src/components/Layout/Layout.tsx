import React, { useState } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import NavBar from '../NavBar/NavBar';
const Layout = ({children}:{children:React.ReactNode}) => {
    const {width} = useWindowDimensions();
    const [isNavOpen,setNavOpen] = useState(false);
    return (
      <div>
          <MainDiv>
              {width! < 900 && (
                <div className='mobile-nav'>
                <button onClick={()=>setNavOpen(!isNavOpen)}>
                  {''}
                  <GiHamburgerMenu/>
                </button>
              {!isNavOpen && (
                <Heading to={""}>
                  <img src={"/assets/logo.png"} alt="" />
                  <p>
                      Notes Compass
                  </p>
                </Heading>
              )}  
              </div>
              )}
              {width! > 900 && <NavBar isNavOpen={isNavOpen} setIsNavOpen={setNavOpen}/>}
              {(width! < 900 && isNavOpen) && <NavBar isNavOpen={isNavOpen} setIsNavOpen={setNavOpen}/> } 
              <Container>
                  {children}
              </Container>
          </MainDiv>
      </div>
    )
}

const Heading = styled(Link)`
    margin: 0 0.9rem 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:1.3rem;
    text-decoration: none;
    p{
        font-family: "Poppins",sans-serif;
        font-weight: 600;
        color: black;
        font-size: 1.1rem;
        margin: 1rem 0 0 0;
        display: flex;
        font-size: 1.5rem;
    }
    button{
        border: none;
        background-color: transparent;
    }
    img{
        width: 20%;
        margin: 0.8rem 0rem 0rem -1rem ;
    }

`

const Container = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  margin: 1rem 0.5rem 1rem 0;
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: scroll;
  @media screen and (max-width:900px){
    height: 100vh;
    border-radius: 0;
  }
`

const MainDiv = styled.div`
  display: flex;
  height: 100vh;
  background-color: #e5e7eb;
  .mobile-nav{
    display: flex;
    align-items: center;
    button{
      margin: 1.6rem 0.5rem 0.5rem 1.2rem;
      font-size: 2rem;
      border: none;
      background-color: transparent;
    }
  }
  @media screen and (max-width:900px){
    flex-direction: column;
    .mobile-nav{
      background-color: white;
    }
  }
`

export default Layout