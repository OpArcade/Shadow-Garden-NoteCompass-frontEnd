import Swal from "sweetalert2"



export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast:any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export function Wish(time:any){
  if(time.getHours()>0 && time.getHours() <1){
    return "Good Morning"
  }
  if(time.getHours()>12 && time.getHours() <17){
    return "Good After Noon"
  }
  if(time.getHours()>17 && time.getHours() <23){
    return "Good Evening"
  }
}

export function Day(Date:any){
  if(Date === 1){
    return "MOnday"
  }
  if(Date === 2){
    return "Tuseday"
  }
  if(Date === 3){
    return "Wednessday"
  }
  if(Date === 4){
    return "Thursday"
  }
  if(Date === 5){
    return "Friday"
  }
  if(Date === 6){
    return "Saturday"
  }
  if(Date === 7){
    return "Sunday"
  }
}