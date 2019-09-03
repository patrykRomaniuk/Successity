import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="text-wrapper">
                <div className="text-header-wrapper">
                    <p className="text-header font__p p__size">Witaj w</p>
                    <span>Chatglass {' '}</span> 
                </div>

                <div className="text-section font__p p__size">
                    Jest to forum stripte poświęcone tematyce naszego wzroku.
                    <br/>
                    Jeśli szukasz odpowiedzi na pytania dotyczące:
                    <ul>
                        <li> chorób oczu</li>
                        <li> wad wzroku</li>
                        <li> dobóru okularów</li>
                        <li> lub innych tego typu problemów</li>
                    </ul>
                    <div className="text-button-wrapper">
                        <Link to="/register">
                            Zarejestruj się
                        </Link>
                       {' '}  i zadaj pytanie!
                    </div>
                </div>

            </div>
            <div className="image-wrapper">

            </div>
        </div>
    )
}

export default Landing
