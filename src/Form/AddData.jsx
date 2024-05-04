import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import { useState } from 'react';
import { supabase } from '../Database/db';

function AddData() {
    const [date, setDate] = useState('');
    const [energyEastCampus, setEnergyEastCampus] = useState('');
    const [energyMbaMca, setEnergyMbaMca] = useState('');
    const [energyCivil, setEnergyCivil] = useState('');
    const [energyMech, setEnergyMech] = useState('');
    const [energyAuto, setEnergyAuto] = useState('');

    const [solarEnergyEastCampus, setSolarEnergyEastCampus] = useState('');
    const [solarEnergyMbaMca, setSolarEnergyMbaMca] = useState('');
    const [solarEnergyCivil, setSolarEnergyCivil] = useState('');
    const [solarEnergyMech, setSolarEnergyMech] = useState('');

    const handleEnergyChange = (setEnergy) => (event) => {
        const value = event.target.value;
        if (!isNaN(value)) {
            setEnergy(value);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const { data: data1, error: error1 } = await supabase
            .from('totalenergycost')
            .insert([
                {
                    'Date': date,
                    'East_Campus': Number(energyEastCampus),
                    'MBA_MCA': Number(energyMbaMca),
                    'Civil': Number(energyCivil),
                    "Mech": Number(energyMech),
                    "Auto": Number(energyAuto),
                    "Total": Number(energyEastCampus) + Number(energyMbaMca) + Number(energyCivil) + Number(energyMech) + Number(energyAuto),
                },
            ]);

        const { data: data2, error: error2 } = await supabase
            .from('totalsolarcost')
            .insert([
                {
                    'Date': date,
                    'East_Campus': Number(solarEnergyEastCampus),
                    'MBA_MCA': Number(solarEnergyMbaMca),
                    'Civil': Number(solarEnergyCivil),
                    "Mech": Number(solarEnergyMech),
                    "Total": Number(solarEnergyEastCampus) + Number(solarEnergyMbaMca) + Number(solarEnergyCivil) + Number(solarEnergyMech)
                },
            ]);

        if (error1) {
            console.error(error1);
        } else {
            console.log(data1);
        }

        if (error2) {
            console.error(error2);
        } else {
            console.log(data2);
        }
    };

    return (
        <>
            <div className="flex flex-row overflow-hidden h-screen">
                <VerticalNavbar />
                <div className="flex flex-col w-full overflow-y-auto">
                    <HorizontalNavbar />
                    <form className='m-4 flex flex-col' onSubmit={handleSubmit} >
                        <label className='text-black p-2'>
                            Enter Date:
                            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Energy for East Campus:
                            <input type='text' value={energyEastCampus} onChange={handleEnergyChange(setEnergyEastCampus)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Energy for MBA and MCA:
                            <input type='text' value={energyMbaMca} onChange={handleEnergyChange(setEnergyMbaMca)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Energy for Civil:
                            <input type='text' value={energyCivil} onChange={handleEnergyChange(setEnergyCivil)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Energy for Mech:
                            <input type='text' value={energyMech} onChange={handleEnergyChange(setEnergyMech)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Energy for AUTO:
                            <input type='text' value={energyAuto} onChange={handleEnergyChange(setEnergyAuto)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Solar Energy for East Campus:
                            <input type='text' value={solarEnergyEastCampus} onChange={handleEnergyChange(setSolarEnergyEastCampus)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Solar Energy for MBA and MCA:
                            <input type='text' value={solarEnergyMbaMca} onChange={handleEnergyChange(setSolarEnergyMbaMca)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Solar Energy for Civil:
                            <input type='text' value={solarEnergyCivil} onChange={handleEnergyChange(setSolarEnergyCivil)} className='m-2 text-black' />
                        </label>
                        <label className='text-black p-2'>
                            Enter Solar Energy for Mech:
                            <input type='text' value={solarEnergyMech} onChange={handleEnergyChange(setSolarEnergyMech)} className='m-2 text-black' />
                        </label>
                        <input type="submit" value="Submit" className='m-2 p-2 bg-blue-500 text-white cursor-pointer w-32' />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddData;