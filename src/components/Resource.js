import React, { useEffect, useState } from 'react';
import '../App.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function Resource() {

    const [resource, setResource] = useState([]);
    const [params, setParams] = useState("");
    const [infoModal, setInfoModal] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    const resourceData = () => {
        fetch('https://engineering-task.elancoapps.com/api/resources')
        .then((response) => { return response.json()})
        .then(res => setResource(res))
    }

    const handleInfo = () => {
        setInfoModal(!infoModal);
    }

    const handleClose = () => {
        setInfoModal(false);
    }

    useEffect(() => {
       resourceData();

    }, [])

    return(
        <div className="mainDivApplication">
             <Modal
                open={infoModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           More Information
                        </Typography>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Here are some information on the resource selected.
                </Typography>
                </Box>
            </Modal>
            <Autocomplete
                disablePortal
                id="resource-list"
                options={resource}
                sx={{ width: 300 }}
                onChange = {
                    (event, newValue) => {
                      setParams(newValue);
                    }
                  }
                renderInput={(param) => (
                   <TextField {...param} label="Resources"/>
                )}
            />
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> 
            <List className="listMain">
            {resource && resource.map((item, index) => (
                params && params === item &&
                 <ListItem key={index} className="listItem">
                 <ListItemButton>
                   <ListItemIcon>
                     <InboxIcon />
                   </ListItemIcon>
                   <ListItemText primary={params} onClick={handleInfo} />
                 </ListItemButton>
               </ListItem> 
                ))}
            </List>
            <List className="listMain">
            {resource && resource.map((item, index) => (
                !params && params !== item &&
                 <ListItem key={index} className="listItem">
                 <ListItemButton>
                   <ListItemIcon>
                     <InboxIcon />
                   </ListItemIcon>
                   <ListItemText primary={item} onClick={handleInfo}/>
                 </ListItemButton>
               </ListItem> 
                ))}
            </List>
            </Box>
        </div>
    )
}

export default Resource;