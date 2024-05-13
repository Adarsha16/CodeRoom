import React from 'react';
import Select from 'react-select';
import JSIcon from './Assets/js';
import PyIcon from './Assets/py';
import Cpp from './Assets/Cpp';


const options = [
    { value: 'JS', label: <JSIcon /> },
    { value: 'Python', label: <PyIcon /> },
    { value: 'C++', label: <Cpp /> }
];
const customStyles = {
    control: (style) => ({
        ...style,
        width: 90,
        height: 30,
        backgroundColor: "#1E2019",
        border: 'hidden'
    })
};

const MySelect = () => (
    <Select options={options} styles={customStyles} defaultValue={options[0]} />
);

export default MySelect;