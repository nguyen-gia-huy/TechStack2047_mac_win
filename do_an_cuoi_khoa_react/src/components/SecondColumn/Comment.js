import { Button, Form, Input } from 'antd'
import React from 'react'

const Comment = () => {

    return (
        <div>
            <h5>Comment</h5>
            <Form style={{ display: 'flex' }}>
                <Form.Item
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your comment!',
                        },
                    ]}
                >
                    <Input style={{ width: '650px', marginRight: '20px' }} placeholder="What do you think about this post" />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Comment
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment