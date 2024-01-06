def ask_question(question, options):
    """Function to ask a question and get user's choice."""
    print(question)
    for idx, option in enumerate(options, 1):
        print(f"{idx}. {option}")
    choice = input("Enter your choice (1, 2, 3, ...): ").strip()
    while not choice.isdigit() or int(choice) not in range(1, len(options) + 1):
        print("Invalid choice! Please enter a valid option.")
        choice = input("Enter your choice (1, 2, 3, ...): ").strip()
    return options[int(choice) - 1]

def main():
    """Main function to ask questions and provide tech path recommendations."""
    
    # Questions and options
    questions = [
        "Which programming language are you most interested in?",
        "What area of technology excites you the most?",
        "Which tech domain would you like to explore further?",
        "What type of tech projects are you interested in?"
    ]
    
    options_list = [
        ["Python", "Java", "JavaScript", "C++"],
        ["Artificial Intelligence", "Web Development", "Cybersecurity", "Data Science"],
        ["Software Development", "Networking", "Cloud Computing", "Mobile App Development"],
        ["Individual Projects", "Collaborative Projects", "Research Projects", "Open-Source Contributions"]
    ]
    
    # User's choices
    user_choices = []
    
    # Ask questions and get user's choices
    for question, options in zip(questions, options_list):
        user_choice = ask_question(question, options)
        user_choices.append(user_choice)
    
    # Provide tech path recommendation based on user's choices
    print("\nBased on your interests, here's a recommended tech path for you:")
    print(f"Programming Language: {user_choices[0]}")
    print(f"Area of Interest: {user_choices[1]}")
    print(f"Tech Domain: {user_choices[2]}")
    print(f"Project Type: {user_choices[3]}")
    print("\nYou might consider exploring opportunities in related fields, courses, or projects based on your preferences.")

if __name__ == "__main__":
    main()
