import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {PiUserCircleLight} from 'react-icons/pi';
import {LiaUserEditSolid} from 'react-icons/lia';
import {BsChevronDown} from 'react-icons/bs';
import {LiaHomeSolid} from 'react-icons/lia';
import {TbCategory} from 'react-icons/tb';
import {IoSettingsOutline} from 'react-icons/io5';
import {PiNotebookLight} from 'react-icons/pi';
import {GiHamburgerMenu} from 'react-icons/gi';
import { AiOutlineClose,AiOutlineLogout } from 'react-icons/ai';
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { useStateContext } from "../../GlobalContext/ContextProvider";

const NavBar = ({isNavOpen,setIsNavOpen}:{isNavOpen:boolean,setIsNavOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const {pathname} = useLocation();
    const [isHovering,setIsHovering] = useState(0);
    const [isDropDownOpen,setDropDownOpen] = useState(false);
    const {width} = useWindowDimensions();
    const {currentUser}  = useStateContext();   
    const navigate = useNavigate();
    const handleSignout=async()=>{
        await signOut(auth).then((response)=>{
            navigate("/login");
        });  
    }
  return (
    <Container>
        <Heading to={"#"}>
            {width! < 900 && 
            <button onClick={()=>setIsNavOpen(!isNavOpen)}>
                {''}
                {isNavOpen === true ? <AiOutlineClose/> :   <GiHamburgerMenu/>}  
            </button>}
            <img src={"/assets/logo.png"} alt="" />
            <p>
                Notes Compass
            </p>
        </Heading>
        <hr/>
        <UserAccountWrapper>
            <UserAccountHeader onClick={()=>setDropDownOpen(!isDropDownOpen)}>
                <div>
                    <img src={isHovering ? "/assets/user-avatar.gif" : "/assets/user-avatar-48.png"} 
                    alt="avatar" className='static' onMouseOver={(e:any)=>setIsHovering(1)} onMouseLeave={(e)=>setIsHovering(0)}/>
                    <p>
                        {currentUser?.displayName}
                    </p>
                </div>
                <div>
                    <BsChevronDown/>
                </div>
            </UserAccountHeader>
           {isDropDownOpen && (
             <UserDropDownMenu>
                <Link to={""}>
                    <PiUserCircleLight className="icon"/> 
                    <span>My Profile</span>
                </Link>
                <Link to={""}>
                    <LiaUserEditSolid className="icon"/> 
                    <span>Edit Profile</span>
                </Link>
                <div className="divider"></div>
                <button onClick={()=>handleSignout()}>
                    <AiOutlineLogout className="icon"/>
                    <span>Logout</span>
                </button>
            </UserDropDownMenu>
           )}
        </UserAccountWrapper>
        <nav>
            <Link to={"/"} className={pathname === "/" ? "activeLink" : "notActiveLink"}>
                <p>
                    <LiaHomeSolid/>
                </p>
                <span>
                    Dasboard
                </span>
            </Link>
            <Link to={"/notes"} className={pathname.includes("notes") ? "activeLink" : "notActiveLink"}>
                <p>
                    <PiNotebookLight/>
                </p>
                <span>
                    Notes
                </span>
            </Link>
            <Link to={'/categories'} className={pathname.includes("categories") ? "activeLink" : "notActiveLink"}>
                <p>
                    <TbCategory/>
                </p>
                <span>
                    Categories
                </span>
            </Link>
            <Link to={"/settings"}  className={pathname.includes("settings") ? "activeLink" : "notActiveLink"}>
                <p>
                    <IoSettingsOutline/>
                </p>
                <span>
                    Settings
                </span>
            </Link>
        </nav> 
    </Container>

  )
}


const UserAccountWrapper = styled.div`
    position: relative;
`

const UserDropDownMenu = styled.div`
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    position: absolute;
    left: 0;
    background-color: white;
    width: 100%;
    top: 80px;
    border-radius: .5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    gap: .5rem;
    animation: slideDown 300ms ease forwards;
    @keyframes slideDown {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .divider{
        height: .5px;
        width: 100%;
        background-color: grey;
    }
    button, a{
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .4rem;
        .icon{
            font-size:20px;
            color: black;
        }
        span{
            color: black;
            font-family: "Poppins", sans-serif;
            font-size:17px;
            font-weight: 400;
        }
    }
    button{
        border: none;
        background-color: transparent;
    }
    
`

const UserAccountHeader = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 0 0 ;
    border: 1px solid #e4e4e4;
    padding: .5rem .5rem;
    border-radius: .5rem;
    div{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    img{
        width: 60px;
        height: 60px;
    }
    p{
        font-family: "Poppins", sans-serif;
        font-weight: 600;
    }

    @media screen and (max-width:1400px) {
        img{
            width: 50px;
            height: 50px;
        }
        p{
            font-size:15px;
        }
    }

    @media screen and (max-width: 1240px) {
        justify-content: space-evenly;
        p{
            display: none;
        }
    }
    @media screen and (max-width:900px){
        p{
            display: contents;
        }
    }
`


const Heading = styled(Link)`
    p{
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        color: black;
        font-size: 1.5rem;
        text-transform: uppercase;
        margin: 1rem 0 0 0;
        @media screen and (max-width: 1250px) {
            display: none;
        }
        @media screen and (max-width: 900px) {
            display: flex;
            font-size: 1.5rem;
        }
    }
    button{
        border: none;
        background-color: transparent;
        font-size: 30px;
    }
    img{
        width: 50px;
        position: relative;
        top: 5px;
        @media screen and (max-width: 1240px) {
            width: 70%;
            margin: 0.5rem 0 0rem 1rem ;
        }
        @media screen and (max-width: 900px) {
            width: 70px;
            margin: 0.5rem 0 0rem 12%;
        }
    }
`
const Container = styled.aside`
    font-family: "Poppins", sans-serif;
    width: 20%;
    margin: 1rem 1rem 1rem 1rem;
    padding: 1rem 2rem;
    border: unset;
    border-radius: 15px;
    color: #212121;
    z-index: 1;
    /* background: #e8e8e8; */
    background-color: white;
    position: relative;
    font-weight: 700;
    font-size: 17px;
    -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.526);
    transition: all 250ms;
    overflow: hidden;
    nav{
        margin-top: 1rem;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        @media screen and (max-width: 1240px) {
            margin: 1rem 0 0 20%;
            display: flex;
            flex-direction: column;
            gap: 1rem;

        }
        .activeLink{
            padding: 1rem 2rem;
            border: unset;
            border-radius: 15px;
            color: #e8e8e8;
            z-index: 1;
            font-weight: 500;
            background: #212121;
            position: relative;
            -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
            box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
            transition: all 250ms;
            display: flex;
            justify-content: center;
            @media screen and (max-width: 1240px) {
                width: 1rem;
                display: flex;
                justify-content: center;
            }
            @media screen and (max-width: 900px) {
                width: 80%;
            }
        p{
            color: #fffefe;
            font-size: 1.2rem;
            margin: 0 0 -0.2rem 0;
            @media screen and (max-width:1250px){
                font-size:1.2rem;
            }
        }
        }
        .notActiveLink{
            padding: 1rem 2rem;
            border: unset;
            border-radius: 15px;
            color: #212121;
            z-index: 1;
            background: #e8e8e8;
            font-weight: 500;
            position: relative;
            font-size: 1.2rem;
            -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
            box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
            transition: all 0.2s ease-in-out;
            display: flex;
            justify-content: center;
            @media screen and (max-width: 1240px) {
                width: 1rem;
                display: flex;
                justify-content: center;
            }
            @media screen and (max-width: 900px) {
                width: 80%;
                display: flex;
                justify-content: center;
            }
            p{
                color: #686565;
                font-size: 1.2rem;
                margin: 0 0 -0.2rem 0;
                @media screen and (max-width:1250px){
                font-size:1.2rem;
                color: #212121;
                }
            }
            &:hover{
                transform: scale(1.2);
            }
        }
    }
    a{
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #6b7280;
        gap: 0.3rem;
        margin-bottom: 0.8rem;
    }
    span{
        font-size: 1.2rem;
        margin: 0 0.8rem 0 0;
        @media screen and (max-width: 1250px) {
            display: none;
        }
        @media screen and (max-width: 900px) {
            display: flex;
        }
    }

    @media screen and (max-width:900px){
        position: fixed;
        z-index: 999;
        width: 100vw;
        height: 100vh;
        background-color: #fefeff;
        transition: all cubic-bezier(0.075, 0.82, 0.165, 1);
        margin: 0;
        padding: 1rem;
    }
    
`
export default NavBar;