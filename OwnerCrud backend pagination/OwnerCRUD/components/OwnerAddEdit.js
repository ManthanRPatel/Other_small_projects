import React from 'react'
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
import { useSelector, useDispatch } from 'react-redux';
import { openAddEDitModal, closeAddEDitModal, addEditOwner } from '../action/OwnerFormAction';
const actions = require('../action/OwnerFormAction') 

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

    const formData = useSelector(state => state.form )
    const HobbyList = useSelector(state => state.owner.HobbyList )
    const RoleList = useSelector(state => state.owner.RoleList )

    const dispatch = useDispatch()

    const handleInputChange = (ev)=>{
       dispatch(actions.handleInputChange(ev.target))
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      console.log(formData)
      dispatch(addEditOwner(formData))
    }

    const handleCheckBoxChange = (e)=>{
      dispatch(actions.handleCheckBoxChange(e.target))
    }

    console.log("formData.profilePic ==",formData.profilePic)
    
      return(
        <>
         <Button variant="contained" color="primary"
          onClick={()=> dispatch(openAddEDitModal()) }
          >Add Owner</Button>

         <Modal isOpen={formData.modalIsOpen}
            onRequestClose={()=> dispatch(closeAddEDitModal())}
            style={{ overlay : {  backgroundColor:'rgba(0,0,0,0.5)'}  }} >


          <h2>Owner  {formData.actionType.toUpperCase()} Form </h2>
          <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">

              <TextField value={formData.fullName} name="fullName" onChange={handleInputChange}  label="Full Name"   />
              <br />
              <TextField value={formData.email}  name="email" onChange={handleInputChange}  label="Email" variant="filled" />
              <br />
              <TextField value={formData.mobileNumber} onChange={handleInputChange} name="mobileNumber" label="Mobile Number"  variant="outlined" />
              <br />
              <TextField value={formData.bio} name="bio" onChange={handleInputChange} label="Write Bio"  variant="outlined" />
              <br />

            <FormControl variant="outlined" className={classes.formControl}>
            <FormControlLabel
              control={<Switch color="primary" 
                checked={formData.isActive}
                value={formData.isActive}
                onChange={e=> dispatch(actions.handleSwitchChange(e.target)) }
              />}
              label="Active Status"
              labelPlacement="start"
            />
            </FormControl>
            <br />
            <FormLabel style={{fontSize:"30px"}} >
                Select Hobbies<br />
                { HobbyList && HobbyList.length > 0 &&
                 HobbyList.map((ele, index) => (
                      <FormControlLabel  key={index} control={<Checkbox key={index}  checked={formData.hobby.includes(ele)} onChange={handleCheckBoxChange} value={ele} />} label={ele} />
                ))}
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
            {RoleList && RoleList.length > 0 &&
                 RoleList.map((ele, index) => (
                    <MenuItem key={index} value={ele}>{ele}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        
        <FormControl component="fieldset">
            <FormLabel style={{fontSize:"30px"}} component="legend">Select Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                <FormControlLabel key={'1'} value="f" control={<Radio />} label="Female" />
                <FormControlLabel key={'2'}  value="m" control={<Radio />} label="Male" />
                <FormControlLabel key={'3'}  value="o" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
        <br />

        <FormLabel style={{fontSize:"20px"}} >
          Select Profile Pic :
        <input type='file' accept='.jpg' name='profilePic' onChange={e=> dispatch(actions.handleFileUploadChange(e.target)) } />
        </FormLabel><br />
        

      <Button variant="contained" type="submit" color="primary"> {formData.actionType} Owner </Button><br />
      </form>


      </Modal>
      <br />
      </>
   )
}

export default OwnerAddEdit
