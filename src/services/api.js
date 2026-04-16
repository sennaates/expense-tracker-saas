export const getDepartments = async () => {
  try {
    const response = await fetch('/data/departments.json');
    if (!response.ok) throw new Error('Departman verisi çekilemedi.');
    return await response.json();
  } catch (error) {
    console.error("API Hatası:", error);
    return [];
  }
};

export const getExpenses = async () => {
  try {
    const response = await fetch('/data/expenses.json');
    if (!response.ok) throw new Error('Harcama verisi çekilemedi.');
    return await response.json();
  } catch (error) {
    console.error("API Hatası:", error);
    return [];
  }
};
