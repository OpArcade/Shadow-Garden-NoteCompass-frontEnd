import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, ThemeLighRed } from '../Constants/constants'
import { styled } from 'styled-components';
import { Toast } from '../Constants/constantFunctions';
import { GrRefresh } from 'react-icons/gr';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import Swal from 'sweetalert2';

const Notes = () => {

    const [GetNotes,setNotes] = useState<any>();

    const getNotes = async()=>{
        await axios.get(`${API_URL}/notefile/getAllNoteFiles`).then((response)=>{
            setNotes(response.data.notefile);
        })
    }

    useEffect(()=>{
        getNotes();
    },[])

    const refreshNotes=()=>{
        getNotes();
        Toast.fire({
            icon: 'success',
            title: 'Refreshed Successfully',
        })
    }

    const deleteNOte = async(notefile:any)=>{
        Swal.fire({
            title:"Are you sure?",
            text:"You Won't able to revert this!!",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:"#28a745",
            cancelButtonAriaLabel:"red",
            confirmButtonText:"Yes delete it!!",
        }).then(async(result)=>{
            if(result.isConfirmed){
                await axios.delete(`${API_URL}/notefile/deleteNoteById`).then((response)=>{
                Swal.fire({
                    title: "Deleted!",
                    text: "Course has been deleted",
                    icon: "success",
                });
                getNotes();
                }).catch((err)=>{
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error",
                })
                })
            }else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                /* Nothing */
            }
        })
    }

  return (
    <div>
      <MainDiv>
        <NotesTable>
            <div className="tableHead">
                <p>
                    Uploded Notes
                </p>
                <button type='button' onClick={()=>refreshNotes()}>
                    <GrRefresh/> Refresh
                </button>
            </div>
            <table>
            <thead>
                <tr>
                <th className='heading'>
                    File Name
                </th>
                <th className='heading'>
                    Uploaded By
                </th>
                <th>
                </th>
                </tr>
                </thead>
                <tbody>
                {GetNotes?.length > 0 &&
                    GetNotes.map((item:any,index:any)=>(
                    <tr>
                    <td className='data'>
                        {item?.fileName}
                    </td>
                    <td className='data'>
                        {item?.uploadedBy}
                    </td>
                    <td className='buttonparentcell'>
                        <div className='buttonbox'>
                        <a href={item?.fileDownloadUrl}>
                        <button>
                            <BsDownload className="icon"/> Download
                        </button>
                        </a>
                        <button onClick={()=>deleteNOte(item._id)} className='deleteButton'>
                            <AiOutlineDelete className="icon"/> Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </NotesTable>
      </MainDiv>
    </div>
  )
}

const MainDiv = styled.div`
    
`
const NotesTable = styled.div`
    a{
        text-decoration: none;
    }
    thead{
    background-color: #d8d5f5;
    color: black;
    text-align: center;
}
th{
    padding: 1rem 1rem;
    text-align: center;
}
td{
    padding: 1rem 1rem;
    text-align: center;
}
table,td{
    margin: 2rem 0 0 0;
    border-collapse: collapse;
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;
}
table{
    width: 100%;
}
tbody{
    border: 1px solid black;
}
tr{
    font-size:18px;
}
.heading{
    font-family: "Poppins",sans-serif;
    font-weight: 400;
    font-size: 17px;
}
.data{
    font-family: "Poppins",sans-serif;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid black;
}
.icon{
    position: relative;
    top: -1px;
}
.buttonparentcell{
    width: 25%;
    border: none;
    border-bottom: 1px solid black;
}
.buttonbox{
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
.deleteButton{
    background-color: ${ThemeLighRed};
    color: white;
}
.tableHead{
    margin: 1rem 0 0 0 ;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
    font-family: "Poppins",sans-serif;
    font-size: 1.5rem;
    }
    button{
    display: flex;
    gap: 0.2rem;
    }
}
button{
    font-family: "Poppins",sans-serif;
    border:none;
    background-color: #d8d5f5;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem 0 0.5rem;
    border-radius: 0.5rem;
    font-size:1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
@media screen and (max-width:900px) {
    .buttonbox{
    flex-direction: column;
    }
    button{
    font-size: 1rem;
    }
}
`

export default Notes
