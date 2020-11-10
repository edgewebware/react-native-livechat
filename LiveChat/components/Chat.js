import React from 'react'
import { StyleSheet, Text, Dimensions, Platform } from 'react-native'
import { View } from 'react-native-animatable'
import PropTypes from 'prop-types'
import { GiftedChat, Message, Bubble, Avatar, SystemMessage, InputToolbar, Send } from 'react-native-gifted-chat'
import NavigationBar from './NavigationBar'

const { height, width } = Dimensions.get('window')
const totalSize = (num) => (Math.sqrt(height * height + width * width) * num) / 100

export default class Chat extends React.Component {
	constructor(props) {
		super(props)

		this.renderFooter = this.renderFooter.bind(this)
		this.renderSend = this.renderSend.bind(this)
	}

	handleSend = ([message]) => {
		this.props.handleSendMessage(message.text)
	}

	renderFooter = () => {
		if (this.props.isTyping) {
			return (
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>Agent is typing...</Text>
				</View>
			)
		}
		return <View style={styles.footerContainer} />
	}

	renderBubble(props) {
		return (
			<Bubble
	      {...props}
	      wrapperStyle={{
	        left: {
	          backgroundColor: '#F3F5FF'
	        },
	        right: {
	          backgroundColor: '#5C5CE4'
	        }
	      }}
	      textStyle={{
	        left: {
	          color: '#414A75'
	        },
	        right: {
	          color: '#fff'
	        }
	      }}
	    />
		)
	}

	renderAvatar(props) {
		return (
			<Avatar
				{...props}
				containerStyle={{
					left: {
						backgroundColor: 'white',
						borderRadius: 25
					}
				}}
			/>
		)
	}

	renderMessage(props) {
		return (
			<Message
				{...props}
				containerStyle={{
					left: {
						marginBottom: 12,
						alignItems: 'center'
					},
					right: {
						marginBottom: 12,
					}
				}}
			/>
		)
	}

	renderSystemMessage(props) {
		return (
			<SystemMessage
				{...props}
				textStyle={{
					color: 'white'
				}}
			/>
		)
	}

	renderInputToolbar(props) {
		return (
			<InputToolbar
				{...props}
				containerStyle={{
					marginHorizontal: 10,
    			borderRadius: 3,
					backgroundColor: '#EEF0F5'
				}}
			/>
		)
	}

	renderSend(props) {
		return (
			 <Send
        {...props}
        containerStyle={{
        	justifyContent: 'center',
    	    alignItems: 'center',
    	    alignSelf: 'center',
    	    marginRight: 15,
        }}
      >
        {this.props.sendIcon}
      </Send>
		)
	}

	render() {
		const {
			messages,
			onInputChange,
			customer,
			isTyping,
			isChatOn,
			onQuickReply,
			disableComposer,
			chatTitle,
			closeChat,
			headerText,
			navbar,
			...restProps
		} = this.props
		const isReconnecting = this.props.connectionState !== 'connected'
		if (isChatOn) {
			return (
				<View
					animation="fadeInUp"
					style={styles.container}
					ref={(ref) => {
						this.chat = ref
					}}
				>
					{navbar ? navbar(closeChat) : <NavigationBar chatTitle={chatTitle} closeChat={closeChat} />}
					{isReconnecting && <Text style={styles.connectionStatus}>Reconnecting...</Text>}
					<GiftedChat
						inverted={false}
						messages={messages}
						renderFooter={this.renderFooter}
						onSend={this.handleSend}
						onInputTextChanged={onInputChange}
						user={customer}
						isTyping={isTyping}
						onQuickReply={onQuickReply}
						disableComposer={disableComposer}
						showAvatarForEveryMessage={false}
						style={{paddingHorizontal: 20}}
						textInputStyle={{fontSize: 16, fontFamily: 'Source Sans Pro', textAlignVertical: 'top', paddingTop: 10}}
						renderInputToolbar={this.renderInputToolbar}
						renderMessage={this.renderMessage}
						renderBubble={this.renderBubble}
						renderAvatar={this.renderAvatar}
						renderSystemMessage={this.renderSystemMessage}
						renderSend={this.renderSend}
						{...restProps}
					/>
				</View>
			)
		}
		return null
	}
}

Chat.propTypes = {
	license: PropTypes.string.isRequired,
	chatTitle: PropTypes.string.isRequired,
	closeChat: PropTypes.func.isRequired,
	isChatOn: PropTypes.bool.isRequired,
	greeting: PropTypes.string.isRequired,
	noAgents: PropTypes.string.isRequired,
	messages: PropTypes.array.isRequired,
	customer: PropTypes.object,
	onInputChange: PropTypes.func.isRequired,
	isTyping: PropTypes.bool.isRequired,
	connectionState: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
	hide: {
		width: 0,
		height: 0,
		position: 'absolute',
	},
	container: {
		width,
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		flexDirection: 'column',
    backgroundColor: 'rgba(51, 51, 204, 0.65)',
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
		zIndex: 1000
	},
	navigation: {
		flex: 1,
	},
	systemMessage: {
		backgroundColor: '#fff',
		alignSelf: 'center',
	},
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	footerText: {
		fontSize: 14,
		color: '#aaa',
	},
	status: {
		textAlign: 'center',
		fontSize: totalSize(2.1),
		fontWeight: '500',
		color: '#444',
		padding: 5,
	},
	connectionStatus: {
		textAlign: 'center',
		fontWeight: '500',
		color: '#000',
		backgroundColor: '#edbe25',
		padding: 10,
	},
})
