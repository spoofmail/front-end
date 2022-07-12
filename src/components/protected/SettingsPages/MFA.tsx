import { useEffect, useState } from "react"
import { Breadcrumbs, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, styled, TextField, Typography } from "@mui/material"
import { QRCodeSVG } from "qrcode.react"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import useRequestMFA from "../../../hooks/useRequestMFA"
import useVerifyMFA from "../../../hooks/useVerifyMFA"
import useMobileQuery from "../../../hooks/useMobileQuery"
import BackLink from "../../BackLink"
import { Check, Error, LockOpen, Lock } from "@mui/icons-material"
import ClipboardCopy from "../../ClipboardCopy"
import { activateMFA } from "../../../redux/user/userSlice"
import { useNavigate } from "react-router"

const MFAContainer = styled('div')(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
}))

interface MFAProps {

}
export const MFA = () => {
    const mfaEnabled = useAppSelector(({ user }) => user.hasMFA)

    if (mfaEnabled) {
        return <MFAActive />
    } else {
        return <MFAInactive />
    }
}

interface MFAActiveProps {
    onChangePath: (newPath: string) => void
}
export const MFAActive = () => {
    const [confirmation, setConfirmation] = useState(false)
    const [passwordDialog, setPasswordDialog] = useState(false)

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', justifyContent: 'center' }}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', justifyContent: 'center' }}>
                <Lock fontSize="large" sx={{ color: 'green' }} />
                <span style={{ color: 'var(--font-color)', marginBottom: '15px' }}>MFA is active!</span>
                <Button color="error" variant="contained" onClick={() => setConfirmation(true)} fullWidth>Deactivate</Button>
            </div>
            <Dialog open={confirmation} onClose={() => setConfirmation(false)}>
                <DialogTitle>Confirm MFA Deactivation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to deactivate MFA?</DialogContentText>
                    <DialogContentText>This will make your account less secure</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={() => {
                        setConfirmation(false)
                        setPasswordDialog(true)
                    }}>Deactivate</Button>
                    <Button color="primary" variant="contained" onClick={() => setConfirmation(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

interface MFAInactiveProps {
    onChangePath: (newPath: string) => void
}
export const MFAInactive = () => {
    const navigate = useNavigate()
    //<LockIcon sx={{ color: 'green' }} /> : <LockOpenIcon sx={{ color: 'red' }} />
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', justifyContent: 'center' }}>
            <LockOpen fontSize="large" sx={{ color: 'red' }} />
            <span style={{ color: 'var(--font-color)', marginBottom: '15px' }}>MFA is not active!</span>
            <Button color="primary" variant="contained" onClick={() => navigate('/settings/mfa/activate')} fullWidth>Activate</Button>
        </div>
    )
}

export const MFAActivateForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isMobile = useMobileQuery(598)

    const [verifyCode, setVerifyCode] = useState('')

    const {
        base32,
        mfaRequestId,
        secret,
        loading: requestLoading,
        error: requestError,
        requestMFA,
    } = useRequestMFA()

    const {
        success: verifySuccess,
        loading: verifyLoading,
        error: verifyError,
        invalidToken,
        verifyMFA,
    } = useVerifyMFA()

    useEffect(() => {
        if (verifySuccess) {
            dispatch(activateMFA())
            navigate('/settings/mfa', { replace: true })
        }
    }, [verifySuccess])

    useEffect(() => {
        requestMFA()
    }, [])

    return (
        <MFAContainer>
            {
                !isMobile && (
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                        <Link underline="hover" color="inherit" href="/settings">
                            Settings
                        </Link>
                        <Typography color="var(--font-color)">MFA</Typography>
                    </Breadcrumbs>
                )
            }
            {
                isMobile && (
                    <BackLink link="/settings" text="Settings" />
                )
            }
            {requestLoading && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', color: 'var(--font-color)', flexGrow: 1 }}>
                    <CircularProgress />
                    <span style={{ marginTop: '15px' }}>Requesting MFA token</span>
                </div>
            )}
            {!requestLoading && requestError && (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--font-color)', flexGrow: 1, padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Error color="error" />
                        <span style={{ marginLeft: '5px' }}>{requestError}</span>
                    </div>
                    <Button color="primary" variant="text" onClick={requestMFA}>Retry</Button>
                </div>
            )}
            {(!verifySuccess) && (
                <>
                    {secret && mfaRequestId && (
                        verifyLoading || verifyError ? (
                            verifyLoading ? <CircularProgress /> : <span style={{ color: 'red' }}>{verifyError}</span>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', color: 'var(--font-color)', padding: '15px', }}>
                                <ul>
                                    <li><span>Scan this QR code in your authenticator app</span></li>
                                    <li><span>Once added enter the code displayed and click verify</span></li>
                                    <li><span>If you need the manual code, use the clipbaord icon and manually enter whats in your clipboard</span></li>
                                </ul>

                                <QRCodeSVG value={secret} includeMargin style={{ width: '100%', margin: '15px' }} />

                                <span>Manual Code:</span>
                                <ClipboardCopy text={base32.slice(0, 15) + '...'} valueToCopy={base32} />

                                <TextField
                                    label="Code"
                                    value={verifyCode}
                                    onChange={e => setVerifyCode(e.target.value)}
                                    error={invalidToken}
                                    helperText={invalidToken ? 'Invalid token, try again' : ''}
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            maxLength: 6
                                        }
                                    }}
                                />

                                <Button color="primary" variant="contained" onClick={() => verifyMFA({
                                    mfaRequestId,
                                    token: verifyCode
                                })} sx={{ marginTop: '15px' }}>Verify</Button>
                            </div>
                        )
                    )}
                </>
            )}
        </MFAContainer>
    )
}

export default MFA