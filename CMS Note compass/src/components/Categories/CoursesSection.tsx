import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { API_URL, MAX_NO_SEMESTERS, ThemeDarkPurple, ThemeLighRed, ThemeLigthPurple } from '../Constants/constants';
import { Toast } from '../Constants/constantFunctions';
import {GrRefresh} from 'react-icons/gr';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { styled } from 'styled-components';
const CoursesSection = () => {
    const [courseName,setCourseName] = useState<any>("");
    const [noOfSemesters,setNoOfSemesters] = useState<any>("");
    const [courses,setCourses] = useState<any>([]);
    const [selectedCourses,setSelectedCourses] = useState<any>(null);

    useEffect(()=>{
        getCourses();
    },[]);

    const getCourses=async()=>{
        await axios.get(`${API_URL}/courses/getAllCourses`).then((response)=>{
            setCourses(response.data.courses);
        })
    }

    const refreshCourses=()=>{
        getCourses();
        Toast.fire({
            icon: 'success',
            title: 'Refreshed Successfully',
        })
    }

    const saveCourse=async(e:any)=>{
        e.preventDefault();
        if(selectedCourses){
        const data = {
            coursName:courseName,
            numberOfSemesters:noOfSemesters};
        console.log(data);
        await axios.put(`${API_URL}/courses/updateCourse`,{...data,_id:selectedCourses._id}
        ).then((response)=>{
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The course has been edited',
            showConfirmButton: false,
            timer: 1500
            });
        });
        }else{
        if(courseName === "" || noOfSemesters === ""){
            Toast.fire({
            position: "top",
            icon:"error",
            title: "Fields can't be blank",
            });
        }else{
           await axios.post(`${API_URL}/courses/addCourse`,{
                courseName:courseName,
                numberOfSemesters:noOfSemesters,
            }).then((response)=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New course has been added',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
            }
        }
        setCourseName("");
        getCourses();
    }

    const deleteCourse=async(courseId:any)=>{
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
            await axios.delete(`${API_URL}/courses/deleteCourse?courseId=${courseId}`).then((response)=>{
            Swal.fire({
                title: "Deleted!",
                text: "Course has been deleted",
                icon: "success",
            });
            getCourses();
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


    const editCourse=async(course:any)=>{
        setSelectedCourses(course);
        setCourseName(course.courseName);
        setNoOfSemesters(course.numberOfSemesters);
    }

    const resetEditCourse=async()=>{
        setSelectedCourses(null);
        setCourseName("");
        setNoOfSemesters(1);
    }
  
return (
    <MainDiv>
    <h3>
        Add new course
    </h3>
    <CoursesAddSection>
        <div>
            <span>Course Name</span>
            <input value={courseName} type="text" onChange={(e)=>setCourseName(e.target.value)}/>
        </div>
        <div>
            <span>No. of Semesters</span>
            <select name="semester" id="semester" onChange={(e)=>setNoOfSemesters(e.target.value)}>
            <option value="" hidden>Select semesters</option>
            {[...Array(MAX_NO_SEMESTERS)].map((item:any,index:any)=>(
                <option value={index+1}>
                {index+1}
                </option>
            ))}
            </select>
        </div>
        <div>
            <button type='button' onClick={(e)=>saveCourse(e)}>
            {selectedCourses != null ? "Edit" : "Save"} 
            </button>
        </div>
        <div>
        {selectedCourses && (
            <button type='button' onClick={()=>resetEditCourse()}>
            Cancel
            </button>
        )}
        </div>
    </CoursesAddSection>
    <CourseTableSection>
            <div className='tableHead'>
            <p>
                Courses
            </p>
            <button type='button' onClick={()=>refreshCourses()}>
            <GrRefresh/> Refresh
            </button>
            </div>
            <table>
            <thead>
                <tr>
                <th className='heading'>
                    Course Name
                </th>
                <th className='heading'>
                    No. of semesters
                </th>
                <th>
                </th>
                </tr>
                </thead>
                <tbody>
                {courses.length > 0 &&
                    courses.map((item:any,index:any)=>(
                    <tr>
                    <td className='data'>
                        {item?.courseName}
                    </td>
                    <td className='data'>
                        {item?.numberOfSemesters}
                    </td>
                    <td className='buttonparentcell'>
                        <div className='buttonbox'>
                        <button onClick={()=>editCourse(item)}>
                            <AiOutlineEdit className="icon"/> Edit
                        </button>
                        <button onClick={()=>deleteCourse(item._id)} className='deleteButton'>
                            <AiOutlineDelete className="icon"/> Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
    </CourseTableSection>
    </MainDiv>
)
}
  
const CourseTableSection = styled.div`
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

const CoursesAddSection = styled.div`
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

button{
    font-family: "Poppins",sans-serif;
    margin: 0.5rem 0 0 0;
    font-size: 20px;
    padding: 1rem 1rem;
    border: none;
    background-color: ${ThemeLigthPurple};
    color: white;
    border-radius: 0.3rem;
    cursor:pointer;
    text-align: center;
    cursor:pointer;
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

export default CoursesSection