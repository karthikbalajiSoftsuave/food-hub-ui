import React from 'react'
import "./style.scss"
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { UI_ENDPOINTS } from '../../utils/endpoints';

const IntroPage: React.FC = () => {
    const navigate = useNavigate();

    const handleOnLogin = () => {
        navigate(UI_ENDPOINTS.AUTH)
    }

    return (
        <div className="w-full mx-auto p-4 home-page min-h-screen">
            <h2 className="text-3xl font-semibold mb-6 text-center text-white">Expore more recipes in Recipe Hub !</h2>
            <div className='description'>
                <h3 className='text-6xl font-semibold mb-6 text-center text-white'>Let's Cooking</h3>
                <h4 className='text-4xl font-semibold mb-6 text-center text-white'>Find best recipes for Cooking</h4>
            </div>
            <Button onClick={handleOnLogin}>
                Start Cooking
            </Button>
        </div>
    )
}

export default IntroPage;