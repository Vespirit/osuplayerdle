import { useState } from "react";
import './PlayerForm.css'

type Props = {
    inputOptions: string[];
    onSubmit: (inputText: string) => void;
}

function PlayerForm({inputOptions, onSubmit}: Props) {

    const [inputText, setInputText] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [inputOptionsFiltered, setInputOptionsFiltered] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);

        const filtered: string[] = inputOptions.filter((option: string) => 
            option.toLowerCase().includes(inputText.toLowerCase())
        );
        setInputOptionsFiltered(filtered);
    };

    const handleOptionClick = (option: string) => {
        setInputText(option);
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputOptions.includes(inputText)) return;

        onSubmit(inputText);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="dropdown-container">
                <input
                    type="text"
                    placeholder="Guess a player!"
                    value={inputText}
                    onChange={handleInputChange}
                    onClick={() => setIsDropdownOpen(true)}
                />

                <div className="dropdown">
                    {isDropdownOpen && (
                        <div className="dropdown-options">
                            {inputOptionsFiltered.map((option) => (
                                <button
                                    key={option}
                                    className="dropdown-option"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button type="submit">Guess!</button>
            </div>
        </form>
    )
}

export default PlayerForm;