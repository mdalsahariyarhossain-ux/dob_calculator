
from datetime import date
import calendar


def calculate_age(dob: date, today: date) -> dict:
    if dob > today:
        raise ValueError("Date of birth cannot be in the future.")

    # Determine the most recent birthday on or before today.
    years = today.year - dob.year

    try:
        birthday_this_year = date(
            today.year, dob.month, dob.day
        )
    except ValueError:
        # February 29 in a non-leap year.
        birthday_this_year = date(today.year, 2, 28)

    if birthday_this_year > today:
        years -= 1

    # Find the most recent birthday anniversary.
    anniversary_year = dob.year + years

    try:
        anniversary = date(
            anniversary_year, dob.month, dob.day
        )
    except ValueError:
        anniversary = date(anniversary_year, 2, 28)

    # Calculate completed calendar months since the anniversary.
    months = today.month - anniversary.month
    if today.day < anniversary.day:
        months -= 1

    if months < 0:
        months += 12

    # Advance from the anniversary by the completed months.
    target_month = anniversary.month + months
    target_year = anniversary.year

    if target_month > 12:
        target_year += (target_month - 1) // 12
        target_month = (target_month - 1) % 12 + 1

    target_day = min(
        anniversary.day,
        calendar.monthrange(target_year, target_month)[1],
    )
    last_completed_month = date(
        target_year, target_month, target_day
    )

    days = (today - last_completed_month).days

    return {
        "years": years,
        "months": months,
        "days": days,
    }
