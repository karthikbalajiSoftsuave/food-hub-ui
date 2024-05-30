import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '../../../icon-components/close-icon';
import Button from '../../../components/Button';
import { useFormik } from 'formik';
import { ratingValidationSchema } from '../../../validators/auth.validator';
import { TRecipe } from '../../../interface/recipes.interface';
import Toaster from '../../../utils/Toaster';
import { STATUS } from '../../../utils/constants';
import { IReviews } from '../../../interface/review.interface';
import { addReview } from '../../../service/reviews.service';
import { Rating } from '@mui/material';
import TextBox from '../../../components/TextBox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

type Tprops = {
    open: boolean;
    setOpen: (open: boolean) => void;
    recipeInfo?: TRecipe
    onClose: (close: boolean) => void;
}

export const ReviewRecipeModal: React.FC<Tprops> = ({ open, setOpen, recipeInfo, onClose }) => {

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    const handleOnRating = async (payload: IReviews) => {
        try {
            const createReview = await addReview(payload);
            if (createReview?.status === STATUS.SUCCESS) {
                Toaster({ toast: createReview?.message, toastType: "success" });
                setOpen(false);
                onClose(true);
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            recipe: recipeInfo?.id ?? "",
            rating: 0,
            comment: "",
        },
        validationSchema: ratingValidationSchema,
        onSubmit: handleOnRating
    });

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Review {recipeInfo?.title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div>
                            <label className='block text-sm text-left font-medium mb-1'>Rating</label>
                            <Rating
                                name="simple-controlled"
                                value={formik.values.rating}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("rating", newValue)
                                }}
                            />
                        </div>

                        <TextBox className="form-field"
                            rows={4}
                            name="comment"
                            label="Comment"
                            placeholder="Enter Comment"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.comment && formik.errors.comment
                                    ? formik.errors.comment
                                    : undefined
                            } />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="primary" type='submit'>
                            Review
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </React.Fragment>
    );
}
