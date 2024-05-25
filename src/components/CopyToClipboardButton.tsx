import {Button} from "@aws-amplify/ui-react";
import {FaClipboard} from "react-icons/fa";
import { toast, ToastOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CopyToClipboardButton({contents}: { contents: string }) {
    return (
        <>
            <Button
                size="small"
                paddingLeft="0.5rem"
                marginLeft="0.5rem"
                onClick={() => copyToClipboard(contents)}>Copy to clipboard<FaClipboard/>
            </Button>
        </>
    )
}

async function copyToClipboard(text: string) {
    const toastOptions: ToastOptions = {
        toastId: `copy-to-clipboard-${text}`,
    }
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard', toastOptions);

    } catch (err) {
        console.error('Error copying to clipboard:', err);
        toast.error('Error copying to clipboard', toastOptions);
    }
}
