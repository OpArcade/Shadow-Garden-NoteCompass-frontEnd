import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { styled } from 'styled-components';
import { API_URL, MAX_NO_SEMESTERS, ThemeDarkPurple, ThemeLigthPurple, fileImageDict } from '../../components/Constants/constants';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {IoMdArrowBack} from 'react-icons/io';
import axios from 'axios';
import {CiCircleRemove} from 'react-icons/ci'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import Swal from 'sweetalert2';
const AddNotesPage = () => {
  
  const [courses,setCourses] = useState<any>([]);
  const [subjects,setSubjects] = useState<any>([]);
  const [isDragging,setIsDraggin] = useState(false);
  const {currentUser} = useStateContext();
  const fileInputRef = useRef<any>(null); 
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resourceName,setResourceName] = useState<any>("");
  const [courseName,setCourseName] = useState<any>("");
  const [subjectName,setSubjectName] = useState<any>("");
  const [semesterNumber,setSemesterNumber] = useState(null);
  useEffect(()=>{
      getResources();
  },[]);

  const getResources=async()=>{
      await axios.get(`${API_URL}/courses/getAllCourses`).then((response)=>{
          setCourses(response.data.courses);
      });
      await axios.get(`${API_URL}/subjects/getAllSubjects`).then((response)=>{
          setSubjects(response.data.subjects);
      });
  }


  const handleFileDropAndSelect = (e:any,isInputHtml:boolean) => {
    e.preventDefault();
    let newFiles:any = [...uploadedFiles];
    let files:any = isInputHtml ? e.target.files : e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        newFiles.push(files[i]);
    }
    setUploadedFiles(newFiles); 
    console.log(newFiles);
  };


  const handleDragOver = (e:any) => {
    e.preventDefault();
  };
  
  const handleRemove = (index:any) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const fileImageAlloc=(fileName:string)=>{
    const fileType = fileName.split(".").pop()?.toLowerCase();
    return fileImageDict[fileType as keyof typeof fileImageDict];
}


const uploadFilesToFirebase=async(noteFiles:any)=>{
    let uploadedNoteFiles:any = [];
    for(let i=0;i<noteFiles.length;i++){
        // const newFileName = `${Date.now()}-${i}.${noteFiles[i].name.split(".").pop()}`;
        const newFileName = noteFiles[i].name;
        const storageref = ref(storage,`/${courseName}/${newFileName}`);
        console.log(storageref);
        const uploadTask = uploadBytesResumable(storageref,noteFiles[i]);
        await uploadTask.then(async(snapshot)=>{
            const downloadUrl = await getDownloadURL(snapshot.ref);
            await axios.post(`${API_URL}/notefile/addNewNoteFile`,{
                fileName : noteFiles[i].name,
                fileDownloadUrl : downloadUrl,
                courseName : courseName,
                semesterNumber : semesterNumber,
                subjectName : subjectName,
                uploadedBy : currentUser!.displayName,
            });
            uploadedNoteFiles.push({
                fileName : noteFiles[i].name,
                uploadedBy : currentUser!.displayName,
                fileDownloadUrl : downloadUrl,
            });
        });
    }
    setUploadedFiles([]);
    console.log(uploadedNoteFiles);
    await axios.post(`${API_URL}/notes/addNewNote`,{
        resourceName : resourceName,
        courseName : courseName,
        semesterNumber : semesterNumber,
        subjectName : subjectName,
        uploadedBy : currentUser!.displayName,
        notesArray : uploadedNoteFiles,
    }).then((response)=>{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New note has been added',
            showConfirmButton: false,
            timer: 1500
        });
    });
}


return (
  <Layout>
      <MainDiv>
          <Heading>
              <h1>
                  New Note
              </h1>
              <Link to={"/notes"}>
                  <IoMdArrowBack/> Back
              </Link>
          </Heading>
          <hr />
          <NoteAddSection>
              <UploadSection>
                    <div
                        className="dropzone"
                        onDrop={(e:any)=>handleFileDropAndSelect(e,false)}
                        onDragOver={handleDragOver}
                    >   
                        <BsFillCloudUploadFill className='icon'/>
                        <p>Drag and drop files here</p>
                        <p>
                            OR
                        </p>
                        <button className="browseFiles" onClick={()=>fileInputRef.current.click()}>
                            Browse Files
                        </button>
                    </div>
                    <input type="file" multiple onChange={(e:any)=>handleFileDropAndSelect(e,true)} hidden ref={fileInputRef}/>
              </UploadSection>
              {uploadedFiles.length > 0 && (
                <FilesDisplaySection>
                    <h1 className='heading'>
                        Uploaded Files
                    </h1>
                    <div className='files-container'>
                        {uploadedFiles.map((file:any, index:any) => (
                            <div key={index} className="file-item">
                                <div>
                                    <img src={fileImageAlloc(file.name)!} alt="image" className='file-image'/>
                                    <span className="file-name">{file.name}</span>
                                </div>
                                <button onClick={() => handleRemove(index)} className='file-button'><CiCircleRemove/></button>
                            </div>
                        ))}
                    </div>
               </FilesDisplaySection>
              )}
              <div>
                  <label>
                      Name
                  </label>
                  <input type="text" placeholder='Enter Name' onChange={(e:any)=>setResourceName(e.target.value)}/>
              </div>
              <div>
                  <label>
                      Course
                  </label>
                  <select name="course" id="" onChange={(e:any)=>{setCourseName(e.target.value)}}>
                      <option value="" hidden>Select course</option>
                      {courses.map((item:any,index:any)=>(
                          <option value={item?.courseName} key={item._id}>
                              {item?.courseName}
                          </option>
                      ))}
                  </select>
              </div>
              <div>
                  <label>
                      Semester
                  </label>
                  <select name="semester" id="" onChange={(e:any)=>setSemesterNumber(e.target.value)}>
                      <option value="" hidden>Select semester</option>
                      {[...Array(MAX_NO_SEMESTERS)].map((item:any,index:any)=>(
                          <option value={index+1} key={index+1}>
                              {index+1}
                          </option>
                      ))}
                  </select>        
              </div>
              <div>
                  <label>
                      Subject
                  </label>
                  <select name="subject" id="" onChange={(e:any)=>setSubjectName(e.target.value)}>
                      <option value="" hidden>Select subject</option>
                      {subjects.map((item:any,index:any)=>(
                          <option value={item?.subjectName}>
                              {item?.subjectName}
                          </option>
                      ))}
                  </select>           
              </div>
              <div>
                <button className='save-button' type='button' onClick={(e:any)=>{uploadFilesToFirebase(uploadedFiles)}}>
                    Save
                </button>
              </div>
          </NoteAddSection>
      </MainDiv>
  </Layout>
)
}

const FilesDisplaySection = styled.div`
    .heading{
        font-family: "Poppins",sans-serif;
        font-weight: 500;
        font-size: 1.7rem;
        margin: 0.5rem 0 1rem 0;
    }
    .file-item{
        width: 100%;
        background-color: #d8d5f583;
        padding: 0.5rem;
        border-radius: 0.5rem;
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-between;
        div{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .5rem;
        }
    }
    .file-image{
        width: 30px;
        height: 30px;
    }
    .file-name{
        font-family: "Poppins",sans-serif;
        font-size: 1.1rem;
    }
    .file-button{
        margin: 0 0 0 3rem;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        padding: 0;
        font-size:30px;
        color: red;
        cursor: pointer;
    }
    .files-container{
        display: flex;
        gap: 1rem;
        width: max-content;
        @media screen and (max-width:900px){
            max-width: 400px;
        }
        @media screen and (max-width:400px) {
            width: 350px;
        }
    }
`


const UploadSection = styled.div`
    max-width: 300px;
    border-radius: 1rem;
    background-color: #f3f3f3;
    padding: 3rem 5rem;
    border: 2px dashed ${ThemeLigthPurple};
    .dropzone{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
    p{
        font-size: 20px;
        margin-bottom: .1rem;
        font-family: "Poppins",sans-serif;
    }
    .icon{
        font-size:50px;
    }
    .browseFiles{
        font-family: "Poppins",sans-serif;
        font-size: 18px;
        margin: 1rem 0 0 0;
        padding: .5rem ;
        border: 2px solid ${ThemeLigthPurple};
        color: ${ThemeLigthPurple};
        border-radius: 0.5rem;
        cursor: pointer;
    }
    @media screen and (max-width:900px) {
        padding: 2rem 4rem;
    }

`

const NoteAddSection = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  div{
      font-family: "Poppins",sans-serif;
      display: flex;
      flex-direction: column;
      align-items: start;

    }
  label{
      font-size:20px;
      font-weight: 500;
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
    .save-button{
        margin: 0 0 10rem 0;
        border: none;
        background-color: ${ThemeLigthPurple};
        color: white;
        font-size: 1.5rem;
        font-family:"Poppins",sans-serif;
        padding: .8rem 1rem;
        border-radius: .5rem;
        cursor: pointer;
    }

`

const Heading = styled.div`
  font-family: "Poppins",sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1{
      font-weight: 500;
  }
  a{
      text-decoration: none;
      border: 1px solid black;
      padding: .5rem ;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: 18px;
      position: relative;
      top: -5px;
  }
`

const MainDiv = styled.div`
  width: 100%;
  margin: 1rem;
`

export default AddNotesPage