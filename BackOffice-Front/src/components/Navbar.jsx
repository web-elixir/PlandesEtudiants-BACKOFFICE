import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { grey, pink } from '@mui/material/colors';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const sectionId = ['Stats', 'QrCode', 'Rewards', 'Maintenance'][newValue];
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const sections = ['Stats', 'QrCode', 'Rewards', 'Maintenance'];
    const scrollPosition = window.scrollY;

    for (let i = 0; i < sections.length; i++) {
      const section = document.getElementById(sections[i]);
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop - sectionHeight / 3 && scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
        setValue(i); 
        break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: 'white',
          zIndex: 1000,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: grey[500],
        }}
      >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example" 
          centered 
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: pink[500],
              color: pink[500],
            },
            '& .Mui-selected': {
              color: pink[500],
            },
          }}
        >
          <Tab label="Stats" {...a11yProps(0)} />
          <Tab label="QrCode" {...a11yProps(1)} />
          <Tab label="Récompense" {...a11yProps(2)} />
          <Tab label="Maintenance" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <Box sx={{ pt: 8 }} /> 
    </Box>
  );
}
