import React from 'react';

interface ZipCodeInputProps {
    zipCode: string;
    onZipCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shouldShowError: boolean;
    errorMessage: string;
}

export const ZipCodeInput: React.FC<ZipCodeInputProps> = ({
    zipCode,
    onZipCodeChange,
    shouldShowError,
    errorMessage,
}) => {
    return (
        <div className={`input-wrap ${shouldShowError ? 'error' : ''}`}>
            <label htmlFor="zipCode">Zip Code:</label>
            <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={onZipCodeChange}
            />
            {shouldShowError && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};