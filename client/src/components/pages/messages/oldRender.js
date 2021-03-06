import moment from "moment";
import React from "react";


// first day
//     messageArray.push(<ChatDay key={moment(messages[0].createdAt)}><span>{moment(messages[0].createdAt).format('LL')}</span></ChatDay>)
// first day

for (let i = 0; i < messages.length; i++) {

    if (messages[i].cool) {
        messageArray.push(
            <ChatContent
                key={messages[i]._id}
                className={messages[i].user._id === user ? 'self' : ''}
            >
                <ChatMessageFlex>
                    <ChatIcon>
                        <svg role="img" height="50px" width="50px" version="1.1" viewBox="0 0 256 256" x="0px" y="0px"><title id="js_il">Чудово</title><g><g><polyline fill="transparent" points="256,0 258,256 2,258 "></polyline><path d="M254,147.1c0-12.7-4.4-16.4-9-20.1c2.6-4.2,5.1-10.2,5.1-18c0-15.8-12.3-25.7-32-25.7h-52c-0.5,0-1-0.5-0.9-1
                                 c1.4-8.6,3-24,3-31.7c0-16.7-4-37.5-19.3-45.7c-4.5-2.4-8.3-3.7-14.1-3.7c-8.8,0-14.6,3.6-16.7,5.9c-1.3,1.4-1.9,3.3-1.8,5.2
                                 l1.3,34.6c0.2,2.8-0.3,5.4-1.6,7.7l-24,47.8c-1.7,3.5-4.2,6.6-7.6,8.5c-3.5,2-6.5,5.9-6.5,9.5v94.8C78,230,94,238,112.3,238h86.1
                                 c13.5,0,22.4-4.5,27.2-13.5c4.4-8.2,3.2-15.8,1.4-21.5c7.4-2.3,14.8-8,16.9-18.3c1.3-6.6-0.7-12.1-2.9-16.2
                                 C247.5,165,254,159.8,254,147.1z" fill="#0084ff" stroke="transparent" strokeLinecap="round" strokeWidth="5%" /><path d="M56.2,100H13.8C7.3,100,2,105.3,2,111.8v128.5c0,6.5,5.3,11.8,11.8,11.8h42.4c6.5,0,11.8-5.3,11.8-11.8V111.8
                                 C68,105.3,62.7,100,56.2,100z" fill="#0084ff" /></g></g></svg>
                    </ChatIcon>
                    <ChatMessageDate>
                        {moment(messages[i].createdAt).format('HH.mm')}
                    </ChatMessageDate>
                </ChatMessageFlex>
            </ChatContent>
        );
        continue;
    }

    if (messages[i].icon.length) {

        messageArray.push(
            <ChatContent
                key={messages[i]._id}
                className={messages[i].user._id === user ? 'self' : ''}
            >
                <ChatMessageFlex>
                    <ChatIcon>
                        <img
                            src={`${window.location.origin}/files/emoji/${messages[i].icon}.gif`}
                            alt={`${messages[i].icon}`}
                        />
                    </ChatIcon>
                    <ChatMessageDate>
                        {moment(messages[i].createdAt).format('HH.mm')}
                    </ChatMessageDate>
                </ChatMessageFlex>
            </ChatContent>
        );
        // continue;
    } else {


        if (messages[i + 1]) {

            messageArray.push(
                <ChatContent
                    key={messages[i]._id}
                    className={messages[i].user._id === user ? 'self' : ''}
                >
                    {
                        messages[i].user._id === messages[i + 1].user._id
                            ?
                            <ChatMessage>
                                <div>
                                    <ChatMessageContent>
                                        {messages[i].message}
                                    </ChatMessageContent>
                                </div>
                                <ChatMessageDate>
                                    {moment(messages[i].createdAt).format('HH.mm')}
                                </ChatMessageDate>
                            </ChatMessage>
                            :
                            <ChatMessage>
                                <div>
                                    <ChatMessageContent>
                                        {messages[i].message}
                                    </ChatMessageContent>
                                </div>
                                <ChatMessageAvatar>
                                    <Img alt="" src={messages[i].user.avatar}/>
                                </ChatMessageAvatar>
                                <ChatMessageDate>
                                    {moment(messages[i].createdAt).format('HH.mm')}
                                </ChatMessageDate>
                            </ChatMessage>
                    }


                </ChatContent>
            )


        } else {

            messageArray.push(
                <ChatContent
                    key={messages[i]._id}
                    className={messages[i].user._id === user ? 'self' : ''}
                >
                    <ChatMessage>
                        <div>
                            <ChatMessageContent>
                                {messages[i].message}
                            </ChatMessageContent>
                        </div>
                        <ChatMessageAvatar>
                            <Img alt="" src={messages[i].user.avatar}/>
                        </ChatMessageAvatar>
                        <ChatMessageDate>
                            {moment(messages[i].createdAt).format('HH.mm')}
                        </ChatMessageDate>
                    </ChatMessage>
                </ChatContent>
            )

        }

    }


    {/*check same day*/}

    if(messages[i + 1]) {

        if (moment(messages[i + 1].createdAt).isAfter(moment(messages[i].createdAt), 'd')) {

            if (moment(messages[i + 1].createdAt).isSame(today, 'd')) {
                messageArray.push(<ChatDay key={messages[i].createdAt}><span>Сьогодні</span></ChatDay>)
            } else {
                messageArray.push(<ChatDay key={messages[i].createdAt}><span>{moment(messages[i + 1].createdAt).format('LL')}</span></ChatDay>)
            }
        }
    }

    {/*check same day*/}




}
