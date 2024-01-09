import tkinter as tk
from tkinter import ttk, simpledialog, messagebox
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure
import time
import random

class TeamBadge(ttk.Frame):
    def __init__(self, master, team_name, button_names, team_color):
        super().__init__(master, borderwidth=2, relief="solid")
        self.team_name = team_name
        self.counters = {button_name: 0 for button_name in button_names}
        self.team_color = team_color

        # Team Name Label
        self.team_name_label = ttk.Label(self, text=f"{self.team_name}: {sum(self.counters.values())}", font=('Helvetica', 12, 'bold'), foreground=self.team_color)
        self.team_name_label.pack(pady=5)

        # Buttons
        self.buttons = {button_name: ttk.Button(self, text=f"{button_name}", command=lambda btn=button_name: self.button_action(btn)) for button_name in button_names}
        for button in self.buttons.values():
            button.pack(pady=5)

    def button_action(self, button_name):
        self.counters[button_name] += 1
        self.update_counters()

    def update_counters(self):
        total_counter = sum(self.counters.values())
        self.team_name_label.config(text=f"{self.team_name}: {total_counter}")

        for button_name, button in self.buttons.items():
            button.config(text=f"{button_name}: {self.counters[button_name]}")

class SimpleApp:
    def __init__(self, root):
        self.root = root
        self.root.title("CaseRaceCounter")
        self.root.configure(background='gray')  # Set window background to gray

        # Title
        title_label = ttk.Label(self.root, text="2024 Case Race", font=('Helvetica', 16, 'bold'), background='gray')
        title_label.pack(pady=10)

        # Clock
        self.clock_label = ttk.Label(self.root, text="", font=('DS-Digital', 48), foreground='#39ff14', background='gray')
        self.clock_label.pack()

        # Graph
        self.times = []
        self.values = {}

        self.figure, self.ax = Figure(), None
        self.canvas = FigureCanvasTkAgg(self.figure, master=self.root)
        self.canvas.get_tk_widget().pack()

        # Team Badges
        self.team_badge_frame = ttk.Frame(self.root, style='Translucent.TFrame')  # Use a translucent background
        self.team_badge_frame.pack(pady=20)

        # Start Button
        self.start_button = ttk.Button(self.root, text="Start", command=self.start_tracking, style='Translucent.TButton')
        self.start_button.pack(pady=10)

        # Button to prompt user for a team name and list of names
        add_team_button = ttk.Button(self.root, text="Add Team", command=self.add_team, style= "borderless.TButton")
        add_team_button.pack(pady=10)

        # Update clock and graph
        self.update_clock()

    def update_clock(self):
        current_time = time.strftime("%H:%M:%S")
        self.clock_label.config(text=current_time)
        self.root.after(1000, self.update_clock)  # Update every 1000 milliseconds (1 second)

    def update_graph(self):
        self.times.append(time.strftime("%H:%M:%S"))  # Append current time for all teams to use

        for team_badge in self.team_badge_frame.winfo_children():
            team_badge_values = [team_badge.counters[button_name] for button_name in team_badge.counters]
            self.values[team_badge.team_name] = self.values.get(team_badge.team_name, []) + [sum(team_badge_values)]

        if self.ax is None:
            self.ax = self.figure.add_subplot(111)
        else:
            self.ax.clear()

        for team_name, team_values in self.values.items():
            team_badge = next(badge for badge in self.team_badge_frame.winfo_children() if badge.team_name == team_name)
            self.ax.plot(self.times, team_values, label=team_name, color=team_badge.team_color)

        self.ax.legend()
        self.ax.set_xlabel('')  # Remove x-axis label
        self.ax.set_xticks([])  # Remove x-axis tick marks
        self.canvas.draw()

        self.root.after(1000, self.update_graph)  # Update every 1000 milliseconds (1 second)
        # self.root.after(60000, self.update_graph)  # Update every 60000 milliseconds (1 minute)



    def start_tracking(self):
        # Disable the start button
        self.start_button.config(state='disabled')
        # Start updating the graph
        self.update_graph()

    def add_team(self):
        team_name = simpledialog.askstring("Input", "Enter Team Name:")
        if team_name:
            # Check if the team name already exists
            existing_team_names = [badge.team_name for badge in self.team_badge_frame.winfo_children()]
            if team_name in existing_team_names:
                messagebox.showwarning("Warning", "Team name already exists. Please choose a different name.")
                return

            button_names = simpledialog.askstring("Input", "Enter Button Names (comma-separated):")
            button_names = [btn.strip() for btn in button_names.split(',')]

            # Generate a random color for the team
            team_color = "#{:06x}".format(random.randint(0, 0xFFFFFF))

            team_badge = TeamBadge(self.team_badge_frame, team_name, button_names, team_color)
            row_index = len(self.team_badge_frame.winfo_children()) // 8  # Divide by 2 to arrange teams horizontally
            team_badge.grid(row=row_index, column=len(self.team_badge_frame.winfo_children()) % 8, padx=10)

# Example usage
if __name__ == "__main__":
    root = tk.Tk()
    app = SimpleApp(root)
    root.mainloop()
