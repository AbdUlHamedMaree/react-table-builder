import { GridLocaleText } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GridLocaleAr: GridLocaleText = {
  // Root
  noRowsLabel: 'لا توجد صفوف',
  noResultsOverlayLabel: 'لا توجد نتائج.',
  errorOverlayDefaultLabel: 'حدث خطأ.',

  // Density selector toolbar button text
  toolbarDensity: 'حجم',
  toolbarDensityLabel: 'حجم',
  toolbarDensityCompact: 'صغير',
  toolbarDensityStandard: 'متوسط',
  toolbarDensityComfortable: 'كبير',

  // Columns selector toolbar button text
  toolbarColumns: 'أعمدة',
  toolbarColumnsLabel: 'حدد الأعمدة',

  // Filters toolbar button text
  toolbarFilters: 'عوامل التصفية',
  toolbarFiltersLabel: 'إظهار عوامل التصفية',
  toolbarFiltersTooltipHide: 'اخفاء عوامل التصفية',
  toolbarFiltersTooltipShow: 'إظهار عوامل التصفية',
  toolbarFiltersTooltipActive: count => `${count.toLocaleString()} من عوامل التصفية المفعلة`,

  // Export selector toolbar button text
  toolbarExport: 'تصدير',
  toolbarExportLabel: 'تصدير',
  toolbarExportCSV: 'تنزيل بصيغة CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'البحث عن عامود',
  columnsPanelTextFieldPlaceholder: 'عنوان العامود',
  columnsPanelDragIconLabel: 'إعادة ترتيب العامود',
  columnsPanelShowAllButton: 'إظهار الكل',
  columnsPanelHideAllButton: 'إخفاء الكل',

  // Filter panel text
  filterPanelAddFilter: 'أضف عامل تصفية',
  filterPanelDeleteIconLabel: 'حذف',
  filterPanelOperators: 'معاملات',
  filterPanelOperatorAnd: 'و',
  filterPanelOperatorOr: 'أو',
  filterPanelColumns: 'أعمدة',
  filterPanelInputLabel: 'القيمة',
  filterPanelInputPlaceholder: 'قيمة عامل التصفية',

  // Filter operators text
  filterOperatorContains: 'يحتوي على',
  filterOperatorEquals: 'يساوي',
  filterOperatorStartsWith: 'يبدأ بـ',
  filterOperatorEndsWith: 'ينتهي بـ',
  filterOperatorIs: 'يكون',
  filterOperatorNot: 'لا يكون',
  filterOperatorAfter: 'هو بعد',
  filterOperatorOnOrAfter: 'في أو بعد',
  filterOperatorBefore: 'هو قبل',
  filterOperatorOnOrBefore: 'في أو قبل',
  filterOperatorIsEmpty: 'فارغ',
  filterOperatorIsNotEmpty: 'ليس فارغاً',

  // Filter values text
  filterValueAny: 'أياً يكن',
  filterValueTrue: 'صحيح',
  filterValueFalse: 'خاطئ',

  // Column menu text
  columnMenuLabel: 'لائحة',
  columnMenuShowColumns: 'إذهار الأعمدة',
  columnMenuFilter: 'عامل تصفية',
  columnMenuHideColumn: 'إخفاء',
  columnMenuUnsort: 'إلغاء الفرز',
  columnMenuSortAsc: 'فرز تصاعدياً',
  columnMenuSortDesc: 'فرز تنازلياً',

  // Column header text
  columnHeaderFiltersTooltipActive: count => `${count.toLocaleString()} من عوامل التصفية النشطة`,
  columnHeaderFiltersLabel: 'إظهار عوامل التصفية',
  columnHeaderSortIconLabel: 'فرز',

  // Rows selected footer text
  footerRowSelected: count => `${count.toLocaleString()} من الصفوف مختارة`,

  // Total rows footer text
  footerTotalRows: 'إجمالي الصفوف:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} من ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'خانة الإختيار',

  // Boolean cell text
  booleanCellTrueLabel: 'صحيح',
  booleanCellFalseLabel: 'خاطئ',

  // Used core components translation keys
  MuiTablePagination: {},
};
