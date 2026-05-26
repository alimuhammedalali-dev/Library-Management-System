1. **List actors** — Who uses the system?
-  Member
- Librarian
- Manager

2. **List main actions** — What do they do? 
- Search for materials (show available materials)
- Managing materials (Add , Updata , Delete)
- Mack a loan
- Make a reservation
- Make Reviews
- Calculate overdue fine

3. **Find the nouns** — Each important noun often becomes a **collection** 
- User
- Materials
- Reviews
- Loans تحوي الاعارات
- Reservations

4. **Draw relationships** 
- User `Member` (1) -> (M) Loans
- User `Member` (1) -> (M) Reservations
- User `Member` (1) -> (M) Reviews
- User `Manager` (1) -> (M) Materials
- Materials (1) -> (M) Reviews
- Materials (1) -> (M) Loans
- Materials (1) -> (M) Reservations

5. **Name fields by role**
- User {
    role [member , librarian, manager],
    name, phone, email, password,registeredAt
    ?address, ?dateOfBirth, ?membershipNumber (only member)
    ?responsibleDepartment (only Librarian)
}
Materials{
    materialType [book, magazine, cd, map], available,
    title, author, publisher, year(book and magazine), category, totalCopies, availableCopies, coverImageUrl,
    ?ISBN (book), 
    ?issueNumber, ?month (magazine)
    userID (REF: User)
}
Reviews{
    stars, ?comment, disReview
    materialsId (REF: Materials),
    memberId (REF: User)
}
Loans{
    status [active, returned, overdue, cancelled],
    loanDate, dueDate, ?actualReturnDate,
    Fines{
      finePerDay, totalFineAmount, paymentStatus [paid, unpaid]  
    },
    materialsId (REF: Materials),
    memberId (REF: User)
    // Business rules for overdue and fine calculate:
    // 1. If CurrentDate > dueDate and actualReturnDate is null:
    //    - Change status to "overdue".
    //    - Calculate totalFineAmount = (CurrentDate - dueDate) * finePerDay.
    // 2. When item is returned (actualReturnDate is set):
    //    - Change status to "returned".
    //    - If there was a fine, totalFineAmount is locked. paymentStatus remains "unpaid" until paid.
}
Reservations{
    material, member, reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter,
    materialsId (REF: Materials),
    memberId (REF: User)
}