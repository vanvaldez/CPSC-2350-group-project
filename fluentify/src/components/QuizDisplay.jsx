import React, {useState, useEffect} from 'react'

export default function QuizDisplay() {
    const [questionNum, setQuestionNum] = useState(1);
    const [curQuestion, setCurQuestion] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [toggle, setToggle] = useState(false);
    const [select, setSelect] = useState(false);
    const [selectColor, setSelectColor] = useState('bg-green-400');

    useEffect(() => {
        setQuestion();
      }, []);

    function handleNext() {
        setQuestionNum(questionNum + 1);

        setSelect(false);
        setToggle(false);

        setQuestion();
    }

    function handleTryAgain() {
        setError('');
        setQuestion();
    }

    function handleSelect(id) {
        if (!select) {
            setSelect(id);

            if ((id === 'optiona') && (curQuestion.optiona === curQuestion.answer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optionb') && (curQuestion.optionb === curQuestion.answer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optionc') && (curQuestion.optionc === curQuestion.answer)) {
                setSelectColor('bg-green-400');
            } else if ((id === 'optiond') && (curQuestion.optiond === curQuestion.answer)) {
                setSelectColor('bg-green-400');
            } else {
                setSelectColor('bg-red-400');
            }

            setToggle(true);
        }
    }

    async function setQuestion() {
        setLoading(true);

        try {
            const question = await getQuestion();
            setCurQuestion(question);
        } catch (e) {
            setError(e.message);
        }

        setLoading(false);
    }

    // temp function
    async function getQuestion() {
        const options = ["Lorem","Ipsum","Dolor","Sit"];
        const index = Math.floor(Math.random() * 4);

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (Math.random() * 100 < 100) {
            throw new Error('testing errors');
        }

        return {
            question: `The answer is ${options[index]}`,
            optiona: options[0],
            optionb: options[1],
            optionc: options[2],
            optiond: options[3],
            answer: options[index]
        };
    }

    return (
        <>
            <div className='col-span-1 bg-blue-400 rounded border border-black text-white p-7 w-full h-full relative min-w-min' >
                {loading ? 
                    (<div>Loading...</div>)
                    : 
                    (error ? 
                        (<div className='grid h-full'>
                            <div className='text-red-600 text-lg'>{error}</div>
                            <div className='flex justify-center items-end'>
                                <button className={'bg-white hover:bg-blue-100 text-blue-400 font-bold text-lg p-2 rounded'} onClick={handleTryAgain}>Try again.</button> 
                            </div>
                        </div>) 
                        :
                        (<div className='grid gap-7 h-full'>
                            <h1 className='font-bold text-lg'>Question {questionNum}</h1>
                            <h1 className='text-3xl'>{curQuestion.question}</h1>
                            <div className='row-span-4 grid grid-cols-1 gap-3 w-full'>
                                <div className={`${select ? (select == 'optiona' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optiona')}>{curQuestion.optiona}</div>
                                <div className={`${select ? (select == 'optionb' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optionb')}>{curQuestion.optionb}</div>
                                <div className={`${select ? (select == 'optionc' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optionc')}>{curQuestion.optionc}</div>
                                <div className={`${select ? (select == 'optiond' ? `${selectColor} text-white` : 'bg-white text-blue-400') : 'bg-white text-blue-400 hover:bg-blue-100 cursor-pointer'} font-bold text-lg p-3 rounded flex items-center justify-center h-full`} onClick={() => handleSelect('optiond')}>{curQuestion.optiond}</div>
                            </div>
                            <div>
                                <button className={`bg-white hover:bg-blue-100 text-blue-400 font-bold text-lg p-2 rounded ${toggle ? 'visible' : 'invisible'}`} onClick={handleNext}>Next</button> 
                            </div>
                        </div>)
                    )
                }
            </div>
        </>
    );
}