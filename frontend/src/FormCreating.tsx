import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './SendForm.css'; // Стили

interface WikiResponse {
    title: string;
    summary: string;
    url: string;
}

const SendForm: React.FC = () => {
    const [buttonColor, setButtonColor] = useState('red');
    const [text, setText] = useState<string>('');
    const [wikiData, setWikiData] = useState<WikiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Cookies.get('random') === 'true') {
            setButtonColor('green');
        }
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Cookies.set('latest_search', text, { expires: 1 });

        try {
            setError(null);

            const response = await axios.get('http://localhost:8000/getters/wiki_page', {
                withCredentials: true,
            });

            // Если данные успешно получены, сбрасываем ошибку и сохраняем результат
            setWikiData(response.data);
        } catch (error) {
            // Если возникает ошибка, сбрасываем данные и устанавливаем сообщение об ошибке
            setWikiData(null);
            setError('Ничего не найдено');
        }
    };

    // Обработчик для кнопки "Режим 🥴"
    const handleRandomClick = () => {
        if (Cookies.get('random') !== 'true') {
            Cookies.set('random', 'true', { expires: 1 });
            setButtonColor('green');
        }
        else {
            Cookies.set('random', 'false', { expires: 1 });
            setButtonColor('red');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="wrapper">
            <h1>Найти статью на Wikipedia</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Введите текст для поиска статьи"
                />
                <button type="submit">Найти 🔍</button>
                <button type="button" onClick={handleRandomClick} style={{ backgroundColor: buttonColor }}>Режим 🥴</button>
            </form>

            {error && <h1>{error}</h1>}

            {wikiData && (
                <div className="wiki-result">
                    <header>
                        <h2>{wikiData.title}</h2>
                    </header>
                    <p>{wikiData.summary}</p>
                    <a href={wikiData.url} target="_blank" rel="noopener noreferrer">
                        Полная статья
                    </a>
                </div>
            )}
        </div>
    );
};

export default SendForm;