import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Modal from 'react-modal'

Modal.setAppElement('#root')

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

function OwnerAddEdit() {

  const classes = useStyles();

    const initialState = {
        actionType: 'add',
        fullName:'',
        email:'',
        mobileNumber:'',
        bio:'',
        gender:'m',
        isActive:false,
        role:'',
        userId:null,
        hobby:[]
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setformData] = useState(initialState)

    const handleInputChange = (ev)=>{
        const { name, value } = ev.target
        console.log(name,"::::",value)
        setformData({ ...formData, [name]: value });
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      console.log(formData)
    }

    const handleCheckBoxChange = (e)=>{
      const target = e.target;
        var value = target.value;
        
        if(target.checked){
          formData.hobby[value] = value;
        }else{
          formData.hobby.splice(value, 1);
        }
    }
    
      return(
        <div>
         <Button variant="contained" color="primary" onClick={()=> setModalIsOpen(true) }>Add Owner</Button>

         <Modal isOpen={modalIsOpen} transparent={true}
            onRequestClose={()=>setModalIsOpen(false)} 
            style={{ overlay : {  backgroundColor:'rgba(0,0,0,0.5)'}  }} >


          <h1>Owner  {formData.actionType.toUpperCase()} Form </h1>
          <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">

              <TextField value={formData.fullName} name="fullName" onChange={(ev) => { ev.preventDefault(); handleInputChange(ev) }} id="standard-basic"  label="Full Name"   />
              <br />
              <TextField value={formData.email}  name="email" onChange={handleInputChange} id="filled-basic" label="Email" variant="filled" />
              <br />
              <TextField value={formData.mobileNumber} onChange={handleInputChange} name="mobileNumber" label="Mobile Number" id="outlined-basic"  variant="outlined" />
              <br />
              <TextField value={formData.bio} name="bio" onChange={handleInputChange} label="Write Bio" id="outlined-basic"  variant="outlined" />
              <br />

            <FormControl variant="outlined" className={classes.formControl}>
            <FormControlLabel
              control={<Switch color="primary" 
                value={formData.isActive}
                onChange={e=>setformData(prev=>({...prev , isActive: !prev.isActive })  ) }
                />}
              label="Active Status"
              labelPlacement="start"
            />
            </FormControl>
            <br />
          <FormLabel style={{fontSize:"30px"}} >
              Select Hobbies :<br />
              <FormControlLabel   control={<Checkbox value='reading' onChange={handleCheckBoxChange} />} label="Reading" />
              <FormControlLabel   control={<Checkbox value='developing' onChange={handleCheckBoxChange} />} label="Developing" />
              <FormControlLabel   control={<Checkbox value='desiging' onChange={handleCheckBoxChange} />} label="Desiging" />
              <FormControlLabel   control={<Checkbox value='swimming' onChange={handleCheckBoxChange} />} label="Swimming" />
          </FormLabel>
          <br />

      <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Select Role</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            label="Role"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'student'}>Student</MenuItem>
            <MenuItem value={'teacher'}>Teacher</MenuItem>
            <MenuItem value={'principal'}>Principal</MenuItem>
            <MenuItem value={'worker'}>Worker</MenuItem>
          </Select>
        </FormControl>
        <br />
        
        <FormControl component="fieldset">
            <FormLabel style={{fontSize:"30px"}} component="legend">Select Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                <FormControlLabel value="f" control={<Radio />} label="Female" />
                <FormControlLabel value="m" control={<Radio />} label="Male" />
                <FormControlLabel value="o" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
        <br />

      <Button variant="contained" type="submit" color="primary"> Add Owner </Button>
      </form>


      </Modal>
      <br />
      </div>
      )
}

export default OwnerAddEdit
