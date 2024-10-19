from twilio.rest import Client
import tkinter as tk

# Twilio credentials
account_sid = 'Enter ur own'
auth_token = 'Enter ur own'
twilio_whatsapp_number = 'whatsapp:+your_twilio_number'  # Replace with your Twilio WhatsApp number

# Function to send WhatsApp message
def send_bill_confirmation():
    client = Client(account_sid, auth_token)
    
    name = name_entry.get()
    gender = gender_var.get()
    email = email_entry.get()
    phone_number = phone_entry.get()
    bill_cost = bill_entry.get()

    message_body = f"Dear {name}, your final bill is {bill_cost}. Thank you for shopping with us. If you have any questions, feel free to contact us at {email}."
    
    # Sending the message to WhatsApp
    message = client.messages.create(
        body=message_body,
        from_='whatsapp:+14155238886',
        to=f'whatsapp:{phone_number}'
    )
    
    confirmation_label.config(text="Message sent successfully!")

# GUI using Tkinter
root = tk.Tk()
root.title("Bill Confirmation Bot")

# Labels
tk.Label(root, text="Name:").grid(row=0)
tk.Label(root, text="Gender:").grid(row=1)
tk.Label(root, text="Email:").grid(row=2)
tk.Label(root, text="Phone Number:").grid(row=3)
tk.Label(root, text="Final Bill Cost:").grid(row=4)

# Entry fields
name_entry = tk.Entry(root)
gender_var = tk.StringVar(value="Male")  # Default value for gender
gender_dropdown = tk.OptionMenu(root, gender_var, "Male", "Female", "Other")
email_entry = tk.Entry(root)
phone_entry = tk.Entry(root)
bill_entry = tk.Entry(root)

# Grid positioning
name_entry.grid(row=0, column=1)
gender_dropdown.grid(row=1, column=1)
email_entry.grid(row=2, column=1)
phone_entry.grid(row=3, column=1)
bill_entry.grid(row=4, column=1)

# Button to send message
send_button = tk.Button(root, text="Send Bill Confirmation", command=send_bill_confirmation)
send_button.grid(row=5, column=1)

# Label for confirmation message
confirmation_label = tk.Label(root, text="")
confirmation_label.grid(row=6, column=1)

# Start the Tkinter loop
root.mainloop()
