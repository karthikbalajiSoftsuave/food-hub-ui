import React, { useEffect, useState } from 'react'
import { STATUS } from '../../utils/constants'
import { getRecipesById } from '../../service/recipes.service'
import TextBox from '../TextBox'
import "./style.scss";
import moment from "moment";
import { Rating } from '@mui/material'

type Tprops = {
    recipe: string
}

const ReviewList: React.FC<Tprops> = ({ recipe }) => {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const getReviews = await getRecipesById(String(recipe));
            if (getReviews?.status === STATUS.SUCCESS) {
                setReviews(getReviews?.data?.reviews);
            }
        } catch (error) {

        }
        finally {
            
        }
    }

    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe])

 

    return (
        <div className='review-list'>
            <h6 className='title'>Comments for this Recipe.</h6>
            {reviews?.map((review: any, index) => <div key={index}>
                <div className='review-title'>
                    <div>
                        <div className='rating-container'> <p className='user'>{review?.first_name} {review?.last_name}</p>
                            <Rating
                                readOnly
                                name="simple-controlled"
                                value={Number(review?.rating)}
                            /></div>
                        <p className='timestamp'>{moment(review?.created_at).format('MMMM Do, YYYY, h:mm A')}</p>
                    </div>
                    <span className='actions'>
                        {/* <EditIcon width={"25"} height={"25"} style={{ cursor: "pointer" }} onClick={handleOnEdit} /> <DeleteIcon width={"25"} height={"25"} style={{ cursor: "pointer" }} onClick={handleOnDelete} /> */}
                    </span>
                </div>
                <TextBox disabled className="form-field" rows={3} defaultValue={review?.comment} />
            </div>)}
        </div>
    )
}

export default ReviewList;