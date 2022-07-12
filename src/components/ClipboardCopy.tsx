import { FC, useState } from "react"
import { Check } from "@mui/icons-material"
import { ClickAwayListener, Tooltip } from "@mui/material"

interface ClipboardCopyProps {
    text: string
    valueToCopy?: string
}

export const ClipboardCopy: FC<ClipboardCopyProps> = ({
    text,
    valueToCopy = text,
}) => {
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
        navigator.clipboard.writeText(valueToCopy);
    };

    return (
        <div className="BtnGroup">
            <div style={{ flexGrow: 1 }}>
                <h3 className="address text-mono f6 btn btn-outline BtnGroup-item">
                    {text}
                </h3>
            </div>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Copied!"
                    >
                        { /* @ts-ignore */}
                        <clipboard-copy value="02d6c266d93c4ff92ca5a8aa2d7b922e067c43de" aria-label="Copy the full SHA" className="btn btn-outline BtnGroup-item" tabindex="0" role="button" onClick={handleTooltipOpen}>
                            {!open && (
                                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" className="octicon octicon-clippy">
                                    <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
                                </svg>
                            )}
                            {open && (
                                <Check htmlColor="green" sx={{ fontSize: '1.0rem', color: 'green' }} />
                            )}
                            { /* @ts-ignore */}
                        </clipboard-copy>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default ClipboardCopy
