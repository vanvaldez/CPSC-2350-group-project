// MainPageModal.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import langList from '../data/languages.json';

export default function MainPageModal(props) {
    const { language, setLanguage, setTranslatedText, sourceLanguage } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState((language && (language != sourceLanguage)) ? language : 
                                                            Object.keys(langList).find(languageCode => languageCode != sourceLanguage));

    useEffect(() => {
        setSelectedLanguage((language && (language != sourceLanguage)) ? language : 
                            Object.keys(langList).find(languageCode => languageCode != sourceLanguage));
    }, [sourceLanguage]);

    function handleSelection(e) {
        setSelectedLanguage(e.target.value);
    }

    function handleConfirm() {
        setTranslatedText('');
        setLanguage(selectedLanguage);
        props.setIsOpen(false);
    }

    function handleClose() {
        props.setError('');
        props.setIsOpen(false);
    }

    return (
        <>
            {props.isOpen ? (
                <div className='fixed top-0 left-0 h-full w-full bg-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center' data-testid='main-modal'>
                    <div className='bg-black rounded-3xl bg-opacity-80 px-8 py-14 min-w-[500px] min-h-[250px] flex justify-center items-center'>
                        {props.error ? 
                        (
                            <div className='space-y-4' data-testid='upload-error-content'>
                                <h1 className='text-white text-xl font-bold'>{props.error}</h1>
                                <button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={handleClose}>Got it!</button>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                <h1 className='text-white text-xl font-bold'>Please choose your target language:</h1>
                                <div>
                                    <h2 className='text-white'>Language</h2>
                                    <select className='rounded w-full' value={selectedLanguage} onChange={handleSelection}>
                                        {
                                            Object.entries(langList)
                                                .filter(([languageCode]) => languageCode != sourceLanguage)
                                                .map(([languageCode, languageName]) => (
                                                    <option value={languageCode} key={languageCode}>{languageName}</option>
                                                ))
                                        }
                                    </select>
                                </div>
                                <div className='flex justify-center space-x-9'>
                                    <Link to='/second-page'>
                                        <button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded' onClick={handleConfirm}>Confirm</button>
                                    </Link>
                                    
                                    <button className='bg-gray-500 hover:bg-gray-800 text-white text-lg font-bold py-2 px-4 rounded' onClick={handleClose}>Back</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div> 
            ) : (
                <></>
            )}
        </>
    );
}
