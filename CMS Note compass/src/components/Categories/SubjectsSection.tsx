import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toast } from '../Constants/constantFunctions';
import Swal from 'sweetalert2';
import { API_URL, MAX_NO_SEMESTERS, ThemeDarkPurple, ThemeLighRed, ThemeLigthPurple } from '../Constants/constants';
import { styled } from 'styled-components';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { GrRefresh } from 'react-icons/gr';
import { useStateContext } from '../../GlobalContext/ContextProvider';

const SubjectsSection = () => {
    
    const [subjects,setSubjects] = useState<any>([]);
    const [subjectName,setSubjectName] = useState<any>("");
    const [semesterNumber,setSemesterNumber] = useState<any>("");
    const [courses,setCourses] = useState<any>([]); 
    const [courseName,setSelectedCourseName] = useState<any>("");
    const [selectedSubject,setSelectedSubject] = useState<any>(null);
    
    const {currentUser} = useStateContext();

    useEffect(()=>{
        console.log(currentUser);
      getCourses();
      getSubjects();
    },[]);
  
  
    const getCourses=async()=>{
      await axios.get(`${API_URL}/courses/getAllCourses`).then((response)=>{
        setCourses(response.data.courses);
      })
    }
    
    const getSubjects=async()=>{
      await axios.get(`${API_URL}/subjects/getAllSubjects`).then((response)=>{
        setSubjects(response.data.subjects);
      })
    }
  
    const refreshSubjects=()=>{
      getSubjects();
      Toast.fire({
        icon: 'success',
        title: 'Refreshed Successfully'
      })
    }
  
    const saveSubject=async(e:any)=>{
      e.preventDefault();
      if(selectedSubject){
        const data = {
          subjectName : subjectName,
          courseName : courseName,
          semesterNumber : semesterNumber,
        };
        await axios.put(`${API_URL}/subjects/updateSubject`,{...data,_id:selectedSubject._id}).then((response)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The subject has been edited',
            showConfirmButton: false,
            timer: 1500
          });
        });
        setSelectedSubject(null);
      }else{
        if(subjectName === "" || courseName === "" || semesterNumber === ""){
          Toast.fire({
            position: "top",
            icon:"error",
            title: "Fields can't be blank",
          });
        }else{
          await axios.post(`${API_URL}/subjects/addSubject`,{
            subjectName : subjectName,
            courseName : courseName,
            semesterNumber : semesterNumber,
          }).then((response)=>{
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New subject has been added',
                showConfirmButton: false,
                timer: 1500
              });
          });
        }
        
      }
      setSubjectName("");
      getSubjects();
    }
  
    const deleteSubject=async(subjectId:any)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor : "red",
        confirmButtonText : "Yes delete it!",
      }).then(async(result)=>{
        if(result.isConfirmed){
          await axios.delete(`${API_URL}/subject/deleteSubject?subjectId=${subjectId}`).then((response)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Subject has been deleted",
              icon: "success",
            });
            getSubjects();
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
      });
    }
  
  
    const editSubject=(subject:any)=>{
      setSelectedSubject(subject);
      setSubjectName(subject.subjectName);
      setSelectedCourseName(subject.courseName);
      setSemesterNumber(subject.semesterNumber);
    }
  
    const resetEditSubject=()=>{
      setSelectedSubject(null);
      setSubjectName("");
      setSelectedCourseName("");
      setSemesterNumber("");
    }
  
  
  
    return (
      <MainDiv>
        <h3>
          Add new subject
        </h3>
        <SubjectAddSection>
          <div>
            <span>
              Subject Name
            </span>
            <input type="text" value={subjectName} onChange={(e:any)=>setSubjectName(e.target.value)}/>
          </div>
          <div>
            <span>Course</span>
            <select name="course" id="course" onChange={(e:any)=>{setSelectedCourseName(e.target.value)}} value={courseName}>
              <option value="" hidden>Select course</option>
              {courses.map((item:any,index:any)=>(
                <option value={item?.courseName} key={item?._id}>
                  {item?.courseName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              Semester No.
            </span>
            <select name="semester" id="semester" onChange={(e:any)=>{setSemesterNumber(e.target.value)}} value={semesterNumber}>
              <option value="" hidden>Select semester</option>
              {[...Array(MAX_NO_SEMESTERS)].map((item:any,index:any)=>(
                <option value={index+1} key={index+1}>
                  {index+1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type='button' onClick={(e:any)=>saveSubject(e)}>
              {selectedSubject != null ? "Edit" : "Save"}
            </button>
          </div>
          {selectedSubject && (
            <div>
              <button type='button' onClick={resetEditSubject}>
                Cancel
              </button>
            </div>
          )}
        </SubjectAddSection>
        <SubjectTableSection>
            <div className='tableHead'>
                <p>
                  Subjects
                </p>
                <button type='button' onClick={()=>refreshSubjects()}>
                  <GrRefresh/> Refresh
                </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className='heading'>
                    Subject Name
                  </th>
                  <th className='heading'>
                    Course Name
                  </th>
                  <th className="heading">
                    Semester Number
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 && (
                  subjects.map((item:any,index:any)=>(
                    <tr>
                      <td className="data">
                        {item?.subjectName}
                      </td>
                      <td className="data">
                        {item?.courseName}
                      </td>
                      <td className="data">
                        {item?.semesterNumber}
                      </td>
                      <td className="buttonparentcell">
                        <div className="buttonbox">
                            <button onClick={()=>editSubject(item)}>
                              <AiOutlineEdit className="icon"/> Edit
                            </button>
                            <button className='deleteButton' onClick={()=>deleteSubject(item._id)}>
                              <AiOutlineDelete className="icon"/> Delete
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </SubjectTableSection>
      </MainDiv>
  
    )
}


const SubjectTableSection = styled.div`
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


const SubjectAddSection = styled.div`
  font-family: "Poppins",sans-serif;
  font-weight: 400;
  display: flex;
  gap: 2rem;
  div{
    display: flex;
    flex-direction: column;
    justify-content:end;
  }
  span{
    font-size:1.3rem;
  }
  select, input{
    font-family: "Poppins",sans-serif;
    margin: 0.5rem 0 0 0;
    font-size: 20px;
    padding: 0.5rem 0.2rem 0.5rem 0.2rem;
    border: 2px solid #80808083;
    border-radius: 0.3rem;
    &:focus{
      outline: none;
      border-color: ${ThemeDarkPurple};
    }
  }
  option{
    font-family: "Poppins",sans-serif;
  }

  button{
    font-family: "Poppins",sans-serif;
    margin: 0.5rem 0 0 0;
    font-size: 20px;
    padding: 1rem 1rem;
    border: none;
    background-color: ${ThemeLigthPurple};
    color: white;
    border-radius: 0.3rem;
    text-align: center;
    cursor: pointer;
  }
  @media screen and (max-width:700px){
    flex-direction: column;
    gap: 1rem;
  }
`

const MainDiv = styled.div`
  margin: 1rem 0 0 0;
  h3{
    font-family: "Poppins",sans-serif;
    font-weight: 500;
    color: ${ThemeDarkPurple};
    margin: 0 0 0.5rem 0;
  }
`

export default SubjectsSection