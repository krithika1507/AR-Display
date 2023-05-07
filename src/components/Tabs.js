import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Application from "./Application";
import Resource from "./Resource";

const TabWithCount = ({ children }) => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <Typography component="div">{children}</Typography>
      
        <Typography
          component="span"
          variant="body2"
          sx={{ marginLeft: "0.5rem" }}
        >
          {/* {count} */}
        </Typography>
    
    </Box>
  );
};

TabWithCount.propTypes = {
  count: PropTypes.string,
  children: PropTypes.node
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Display Tabs"
        >
          <Tab
            label={<TabWithCount>Applications</TabWithCount>}
          />
          <Tab
            label={<TabWithCount>Resources</TabWithCount>}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Application/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Resource />
      </TabPanel>
    </Box>
  );
}
