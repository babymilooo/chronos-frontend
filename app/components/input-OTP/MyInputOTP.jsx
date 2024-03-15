import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '.';


export function InputOTPPattern({ onChange }) {
    const handleChange = (value) => {
        if (onChange) {
            if (value.length === 8) {
                onChange(value);
            }
            else {
                console.log("Введите 6 символов")
            }
        }
    };

    return (
        <InputOTP
            maxLength={8}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={handleChange}
            render={({ slots }) => (
                <InputOTPGroup>
                    {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                    ))}{" "}
                </InputOTPGroup>
            )}
        />
    )
}
