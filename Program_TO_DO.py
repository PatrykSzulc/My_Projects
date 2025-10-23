user_choice = -1

tasks = []

def show_tasks():
    task_index = 0
    for task in tasks:
        print(f"- {task} " + "[" + str(task_index) + "]")
        task_index += 1

def add_task():
    new_task = input("Podaj nowe zadanie do zrobienia: ")
    tasks.append(new_task)
    print(f'Dodano zadanie: "{new_task}"')

def del_task():
    task_index = int(input("Podaj numer zadania do usunięcia: "))

    if task_index < 0 or task_index > len(tasks) -1:
        print("Nie ma takiego zadania.")
        return
    tasks.pop(task_index)
    print(f'Usunięto zadanie o numerze: {task_index}')

def save_tasks_to_file():
    file_name = input("Podaj nazwę pliku do zapisu zadań: ")
    with open(file_name, "w") as file:
        for task in tasks:
            file.write(task + "\n")
        file.close()
    print(f'Zapisano zadania do pliku: "{file_name}"')

def load_tasks_from_file():
    file_name = input("Podaj nazwę pliku do wczytania zadań: ")
    try:
        with open(file_name, "r") as file:
            for line in file:
                tasks.append(line.strip())
            file.close()
        print(f'Wczytano zadania z pliku: "{file_name}"')
    except FileNotFoundError:
        print(f'Plik "{file_name}" nie istnieje. Rozpoczynasz z pustą listą zadań.')


while user_choice != 6:
    if user_choice == 1:
        show_tasks()

    if user_choice == 2:
        add_task()

    if user_choice == 3:
        del_task()

    if user_choice == 4:
        save_tasks_to_file()
    
    if user_choice == 5:
        load_tasks_from_file()

    print()
    print("Menu:")
    print("1. Pokaż zadania")
    print("2. Dodaj zadanie")
    print("3. Usuń zadanie")
    print("4. Zapisz zmiany w pliku")
    print("5. Wczytaj zadania z pliku")
    print("6. Wyjdź")

    user_choice = int(input("Wybierz opcję (1-5): "))
    print()

