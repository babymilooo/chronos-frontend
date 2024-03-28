import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


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
        >
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
            </InputOTPGroup>
        </InputOTP>
    )
}
