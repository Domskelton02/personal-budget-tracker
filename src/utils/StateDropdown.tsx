import React from 'react';
import { stateAcronyms } from './state-acronyms';

interface StateDropdownProps {
    selectedState: string;
    onSelectState: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    shouldShowError: boolean;
    errorMessage: string;
}

export const StateDropdown: React.FC<StateDropdownProps> = ({
    selectedState,
    onSelectState,
    shouldShowError,
    errorMessage,
}) => {
    return (
        <div className={`input-wrap ${shouldShowError ? 'error' : ''}`}>
            <label htmlFor="state">State:</label>
            <select id="state" value={selectedState} onChange={onSelectState}>
                <option value="">Select a state</option>
                {stateAcronyms.map((stateCode) => (
                    <option key={stateCode} value={stateCode}>
                        {stateCode}
                    </option>
                ))}
            </select>
            {shouldShowError && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};