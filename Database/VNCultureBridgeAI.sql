
/* =========================================================
   CSDL: VNCultureBridgeAI
   SQL Server - Ban chot cuoi theo nghiep vu
   ========================================================= */
IF DB_ID(N'VNCultureBridgeAI') IS NULL
BEGIN
    CREATE DATABASE VNCultureBridgeAI;
END
GO

USE VNCultureBridgeAI;
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

/* =========================================================
   1. NGON NGU
   ========================================================= */
CREATE TABLE NGON_NGU
(
    MaNgonNgu           VARCHAR(10) PRIMARY KEY,
    TenNgonNgu          NVARCHAR(100) NOT NULL,
    TenBanDia           NVARCHAR(100) NOT NULL,
    LaMacDinh           BIT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1
);
GO

/* =========================================================
   2. QUAN TRI - NGUOI DUNG - VAI TRO
   ========================================================= */
CREATE TABLE QUAN_TRI_NGUOI_DUNG
(
    IDNguoiDung         BIGINT IDENTITY(1,1) PRIMARY KEY,
    TenDangNhap         NVARCHAR(100) NOT NULL UNIQUE,
    Email               NVARCHAR(255) NOT NULL UNIQUE,
    MatKhauHash         NVARCHAR(255) NOT NULL,
    HoTen               NVARCHAR(150) NOT NULL,
    TrangThai           VARCHAR(20) NOT NULL
                        CHECK (TrangThai IN ('HOAT_DONG','NGUNG_HOAT_DONG','KHOA')),
    LanDangNhapCuoi     DATETIME2(0) NULL,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat         DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer              ROWVERSION
);
GO

CREATE TABLE QUAN_TRI_VAI_TRO
(
    IDVaiTro            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaVaiTro            VARCHAR(50) NOT NULL UNIQUE,
    TenVaiTro           NVARCHAR(100) NOT NULL,
    MoTa                NVARCHAR(300) NULL
);
GO

CREATE TABLE QUAN_TRI_NGUOI_DUNG_VAI_TRO
(
    IDNguoiDung         BIGINT NOT NULL,
    IDVaiTro            BIGINT NOT NULL,
    NgayGan             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    IDNguoiGan          BIGINT NULL,
    PRIMARY KEY (IDNguoiDung, IDVaiTro),
    FOREIGN KEY (IDNguoiDung) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDVaiTro) REFERENCES QUAN_TRI_VAI_TRO(IDVaiTro),
    FOREIGN KEY (IDNguoiGan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE QUAN_TRI_QUYEN
(
    IDQuyen             BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaQuyen             VARCHAR(100) NOT NULL UNIQUE,
    TenQuyen            NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(500) NULL
);
GO

CREATE TABLE QUAN_TRI_VAI_TRO_QUYEN
(
    IDVaiTro            BIGINT NOT NULL,
    IDQuyen             BIGINT NOT NULL,
    PRIMARY KEY (IDVaiTro, IDQuyen),
    FOREIGN KEY (IDVaiTro) REFERENCES QUAN_TRI_VAI_TRO(IDVaiTro),
    FOREIGN KEY (IDQuyen) REFERENCES QUAN_TRI_QUYEN(IDQuyen)
);
GO

/* =========================================================
   3. DANH MUC NEN - TAXONOMY
   ========================================================= */
CREATE TABLE DANH_MUC_CHU_DE
(
    IDDanhMuc           BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaDanhMuc           VARCHAR(50) NOT NULL UNIQUE,
    IDDanhMucCha        BIGINT NULL,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDDanhMucCha) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc)
);
GO

CREATE TABLE DANH_MUC_CHU_DE_BAN_DICH
(
    IDDanhMuc           BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenDanhMuc          NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDDanhMuc, MaNgonNgu),
    FOREIGN KEY (IDDanhMuc) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE VUNG_VAN_HOA
(
    IDVung              BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaVung              VARCHAR(50) NOT NULL UNIQUE,
    IDVungCha           BIGINT NULL,
    LoaiVung            VARCHAR(20) NOT NULL
                        CHECK (LoaiVung IN ('DIA_LY','VAN_HOA')),
    DuLieuBanDoGeoJson  NVARCHAR(MAX) NULL,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDVungCha) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE VUNG_VAN_HOA_BAN_DICH
(
    IDVung              BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenVung             NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDVung, MaNgonNgu),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE DAN_TOC
(
    IDDanToc            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaDanToc            VARCHAR(50) NOT NULL UNIQUE,
    ThuTuSapXep         INT NOT NULL DEFAULT 0,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE DAN_TOC_BAN_DICH
(
    IDDanToc            BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenDanToc           NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(1000) NULL,
    PRIMARY KEY (IDDanToc, MaNgonNgu),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE THE_NOI_DUNG
(
    IDThe               BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaThe               VARCHAR(100) NOT NULL UNIQUE,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE THE_NOI_DUNG_BAN_DICH
(
    IDThe               BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TenThe              NVARCHAR(200) NOT NULL,
    MoTa                NVARCHAR(500) NULL,
    PRIMARY KEY (IDThe, MaNgonNgu),
    FOREIGN KEY (IDThe) REFERENCES THE_NOI_DUNG(IDThe),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE TU_KHOA
(
    IDTuKhoa            BIGINT IDENTITY(1,1) PRIMARY KEY,
    MaTuKhoa            VARCHAR(100) NOT NULL UNIQUE,
    HoatDong            BIT NOT NULL DEFAULT 1,
    NgayTao             DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE TU_KHOA_BAN_DICH
(
    IDTuKhoa            BIGINT NOT NULL,
    MaNgonNgu           VARCHAR(10) NOT NULL,
    TuKhoaHienThi       NVARCHAR(200) NOT NULL,
    PRIMARY KEY (IDTuKhoa, MaNgonNgu),
    FOREIGN KEY (IDTuKhoa) REFERENCES TU_KHOA(IDTuKhoa),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

/* =========================================================
   4. BAI VIET VAN HOA
   ========================================================= */
CREATE TABLE BAI_VIET
(
    IDBaiViet                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    DuongDanSeo                 NVARCHAR(200) NOT NULL UNIQUE,
    MaNgonNguGoc                VARCHAR(10) NOT NULL DEFAULT 'vi',
    LoaiBaiViet                 VARCHAR(30) NOT NULL
                                CHECK (LoaiBaiViet IN ('LE_HOI','TIN_NGUONG','PHONG_TUC','AM_THUC',
                                                       'TRANG_PHUC','NGHE_THUAT_DAN_GIAN',
                                                       'KIEN_TRUC','BIEU_TUONG','VAN_HOA_DAN_TOC','CHUNG')),
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThai IN ('NHAP','CHO_DUYET','DA_DUYET','DA_XUAT_BAN','AN','LUU_TRU','TU_CHOI')),
    CapDoNhayCam                TINYINT NOT NULL DEFAULT 1
                                CHECK (CapDoNhayCam BETWEEN 1 AND 5),
    MucDoKiemDuyet              VARCHAR(20) NOT NULL DEFAULT 'THUONG'
                                CHECK (MucDoKiemDuyet IN ('THUONG','CHAT')),
    NoiDungNoiBat               BIT NOT NULL DEFAULT 0,
    CanDongBoAI                 BIT NOT NULL DEFAULT 1,
    TrangThaiDongBoAI           VARCHAR(20) NOT NULL DEFAULT 'CHO_DONG_BO'
                                CHECK (TrangThaiDongBoAI IN ('KHONG_CAN','CHO_DONG_BO','DANG_DONG_BO','SAN_SANG','LOI')),
    GhiChuBienTap               NVARCHAR(2000) NULL,
    LyDoTuChoi                  NVARCHAR(2000) NULL,
    NgayDuyet                   DATETIME2(0) NULL,
    IDNguoiDuyet                BIGINT NULL,
    NgayXuatBan                 DATETIME2(0) NULL,
    IDNguoiXuatBan              BIGINT NULL,
    NgayAn                      DATETIME2(0) NULL,
    IDNguoiAn                   BIGINT NULL,
    NgayLuuTru                  DATETIME2(0) NULL,
    IDNguoiLuuTru               BIGINT NULL,
    IDPhienBanXuatBanHienTai    BIGINT NULL,
    IDNguoiTao                  BIGINT NOT NULL,
    IDNguoiCapNhat              BIGINT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer                      ROWVERSION,
    FOREIGN KEY (MaNgonNguGoc) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiXuatBan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiAn) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiLuuTru) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiTao) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiCapNhat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_BAN_DICH
(
    IDBanDich                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    TieuDe                      NVARCHAR(300) NOT NULL,
    TomTat                      NVARCHAR(1000) NULL,
    GioiThieu                   NVARCHAR(MAX) NULL,
    NguonGoc                    NVARCHAR(MAX) NULL,
    YNghiaVanHoa                NVARCHAR(MAX) NULL,
    BoiCanhSuDung               NVARCHAR(MAX) NULL,
    NoiDungChiTiet              NVARCHAR(MAX) NULL,
    GhiChuCultureShock          NVARCHAR(MAX) NULL,
    TieuDeSEO                   NVARCHAR(255) NULL,
    MoTaSEO                     NVARCHAR(500) NULL,
    SoPhutDoc                   INT NULL,
    LaBanDichMay                BIT NOT NULL DEFAULT 0,
    TrangThaiBanDich            VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThaiBanDich IN ('NHAP','DA_SOAT','DA_DUYET','DA_XUAT_BAN')),
    IDNguoiSoat                 BIGINT NULL,
    NgaySoat                    DATETIME2(0) NULL,
    GhiChuDichGia               NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDBaiViet, MaNgonNgu),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiSoat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_DANH_MUC
(
    IDBaiViet                   BIGINT NOT NULL,
    IDDanhMuc                   BIGINT NOT NULL,
    LaDanhMucChinh              BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDDanhMuc),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDDanhMuc) REFERENCES DANH_MUC_CHU_DE(IDDanhMuc)
);
GO

CREATE UNIQUE INDEX UX_BAI_VIET_DANH_MUC_CHINH
ON BAI_VIET_DANH_MUC(IDBaiViet)
WHERE LaDanhMucChinh = 1;
GO

CREATE TABLE BAI_VIET_VUNG_VAN_HOA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDVung                      BIGINT NOT NULL,
    LoaiLienHe                  VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienHe IN ('NGUON_GOC','THUC_HANH','PHO_BIEN','LIEN_QUAN')),
    PRIMARY KEY (IDBaiViet, IDVung),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE BAI_VIET_DAN_TOC
(
    IDBaiViet                   BIGINT NOT NULL,
    IDDanToc                    BIGINT NOT NULL,
    LoaiLienHe                  VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienHe IN ('NGUON_GOC','THUC_HANH','LIEN_QUAN')),
    PRIMARY KEY (IDBaiViet, IDDanToc),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc)
);
GO

CREATE TABLE BAI_VIET_THE
(
    IDBaiViet                   BIGINT NOT NULL,
    IDThe                       BIGINT NOT NULL,
    PRIMARY KEY (IDBaiViet, IDThe),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDThe) REFERENCES THE_NOI_DUNG(IDThe)
);
GO

CREATE TABLE BAI_VIET_TU_KHOA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDTuKhoa                    BIGINT NOT NULL,
    PRIMARY KEY (IDBaiViet, IDTuKhoa),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDTuKhoa) REFERENCES TU_KHOA(IDTuKhoa)
);
GO

CREATE TABLE BAI_VIET_LIEN_QUAN
(
    IDBaiViet                   BIGINT NOT NULL,
    IDBaiVietLienQuan           BIGINT NOT NULL,
    LoaiLienKet                 VARCHAR(20) NOT NULL DEFAULT 'LIEN_QUAN'
                                CHECK (LoaiLienKet IN ('LIEN_QUAN','CUNG_CHU_DE','CUNG_VUNG','CUNG_DAN_TOC','GOI_Y')),
    TrongSo                     DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    PRIMARY KEY (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet),
    CHECK (IDBaiViet <> IDBaiVietLienQuan),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDBaiVietLienQuan) REFERENCES BAI_VIET(IDBaiViet)
);
GO

/* =========================================================
   5. MEDIA
   ========================================================= */
CREATE TABLE MEDIA
(
    IDMedia                     BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiMedia                   VARCHAR(20) NOT NULL
                                CHECK (LoaiMedia IN ('HINH_ANH','VIDEO','AM_THANH','TAI_LIEU')),
    TenTep                      NVARCHAR(255) NOT NULL,
    DuongDanTep                 NVARCHAR(1000) NOT NULL,
    NhaCungCapLuuTru            NVARCHAR(100) NULL,
    MimeType                    NVARCHAR(100) NULL,
    KichThuocBytes              BIGINT NULL CHECK (KichThuocBytes IS NULL OR KichThuocBytes >= 0),
    RongPx                      INT NULL CHECK (RongPx IS NULL OR RongPx >= 0),
    CaoPx                       INT NULL CHECK (CaoPx IS NULL OR CaoPx >= 0),
    ThoiLuongGiay               INT NULL CHECK (ThoiLuongGiay IS NULL OR ThoiLuongGiay >= 0),
    ChuSoHuuBanQuyen            NVARCHAR(255) NULL,
    ThongTinGiayPhep            NVARCHAR(255) NULL,
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'NHAP'
                                CHECK (TrangThai IN ('NHAP','HOAT_DONG','TU_CHOI','LUU_TRU')),
    IDNguoiTaiLen               BIGINT NOT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayCapNhat                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    RowVer                      ROWVERSION,
    FOREIGN KEY (IDNguoiTaiLen) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE MEDIA_BAN_DICH
(
    IDMedia                     BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    VanBanThayThe               NVARCHAR(500) NULL,
    ChuThich                    NVARCHAR(1000) NULL,
    PRIMARY KEY (IDMedia, MaNgonNgu),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE BAI_VIET_MEDIA
(
    IDBaiViet                   BIGINT NOT NULL,
    IDMedia                     BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    LaMediaChinh                BIT NOT NULL DEFAULT 0,
    NguCanhSuDung               VARCHAR(20) NOT NULL DEFAULT 'BO_SUU_TAP'
                                CHECK (NguCanhSuDung IN ('ANH_BIA','BO_SUU_TAP','CHEN_NOI_DUNG','THAM_KHAO')),
    PRIMARY KEY (IDBaiViet, IDMedia),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia)
);
GO

CREATE UNIQUE INDEX UX_BAI_VIET_MEDIA_CHINH
ON BAI_VIET_MEDIA(IDBaiViet)
WHERE LaMediaChinh = 1;
GO

CREATE TABLE MEDIA_VUNG_VAN_HOA
(
    IDMedia                     BIGINT NOT NULL,
    IDVung                      BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDMedia, IDVung),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (IDVung) REFERENCES VUNG_VAN_HOA(IDVung)
);
GO

CREATE TABLE MEDIA_DAN_TOC
(
    IDMedia                     BIGINT NOT NULL,
    IDDanToc                    BIGINT NOT NULL,
    ThuTuHienThi                INT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDMedia, IDDanToc),
    FOREIGN KEY (IDMedia) REFERENCES MEDIA(IDMedia),
    FOREIGN KEY (IDDanToc) REFERENCES DAN_TOC(IDDanToc)
);
GO

/* =========================================================
   6. NGUON THAM KHAO
   ========================================================= */
CREATE TABLE NGUON_THAM_KHAO
(
    IDNguon                     BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiNguon                   VARCHAR(30) NOT NULL
                                CHECK (LoaiNguon IN ('SACH','BAI_BAO','TAP_CHI','WEBSITE','PHONG_VAN','LUU_TRU','VIDEO','TAI_LIEU_NHA_NUOC','KHAC')),
    TieuDeNguon                 NVARCHAR(500) NOT NULL,
    TacGia                      NVARCHAR(300) NULL,
    NhaXuatBan                  NVARCHAR(300) NULL,
    NamXuatBan                  SMALLINT NULL CHECK (NamXuatBan IS NULL OR NamXuatBan BETWEEN 1000 AND 2100),
    URLNguon                    NVARCHAR(1000) NULL,
    ISBN                        NVARCHAR(50) NULL,
    DOI                         NVARCHAR(100) NULL,
    MaNgonNguNguon              VARCHAR(10) NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    MucDoTinCay                 TINYINT NOT NULL DEFAULT 3 CHECK (MucDoTinCay BETWEEN 1 AND 5),
    DaXacMinh                   BIT NOT NULL DEFAULT 0,
    IDNguoiXacMinh              BIGINT NULL,
    NgayXacMinh                 DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (MaNgonNguNguon) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDNguoiXacMinh) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE BAI_VIET_NGUON_THAM_KHAO
(
    IDBaiViet                   BIGINT NOT NULL,
    IDNguon                     BIGINT NOT NULL,
    GhiChuTrichDan              NVARCHAR(500) NULL,
    TrangTu                     INT NULL,
    TrangDen                    INT NULL,
    LaNguonChinh                BIT NOT NULL DEFAULT 0,
    PRIMARY KEY (IDBaiViet, IDNguon),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguon) REFERENCES NGUON_THAM_KHAO(IDNguon)
);
GO

/* =========================================================
   7. PHIEN BAN - LICH SU TRANG THAI
   ========================================================= */
CREATE TABLE PHIEN_BAN_BAI_VIET
(
    IDPhienBan                  BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    SoPhienBan                  INT NOT NULL,
    LoaiThayDoi                 VARCHAR(20) NOT NULL
                                CHECK (LoaiThayDoi IN ('TAO_MOI','CAP_NHAT','GUI_DUYET','DUYET','XUAT_BAN','AN','LUU_TRU','TU_CHOI','PHUC_HOI','CAP_NHAT_BAN_DICH','CAP_NHAT_METADATA')),
    TomTatThayDoi               NVARCHAR(500) NULL,
    DuLieuSnapshotJson          NVARCHAR(MAX) NOT NULL,
    TrangThaiPhienBan           VARCHAR(20) NOT NULL
                                CHECK (TrangThaiPhienBan IN ('NHAP','CHO_DUYET','DA_DUYET','TU_CHOI','DA_XUAT_BAN','AN','LUU_TRU')),
    IDNguoiGuiDuyet             BIGINT NULL,
    NgayGuiDuyet                DATETIME2(0) NULL,
    IDNguoiDuyet                BIGINT NULL,
    NgayDuyet                   DATETIME2(0) NULL,
    IDNguoiXuatBan              BIGINT NULL,
    NgayXuatBan                 DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDBaiViet, SoPhienBan),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguoiGuiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiDuyet) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    FOREIGN KEY (IDNguoiXuatBan) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

ALTER TABLE BAI_VIET
ADD CONSTRAINT FK_BAI_VIET_PHIEN_BAN_HIEN_TAI
FOREIGN KEY (IDPhienBanXuatBanHienTai) REFERENCES PHIEN_BAN_BAI_VIET(IDPhienBan);
GO

CREATE TABLE LICH_SU_TRANG_THAI_BAI_VIET
(
    IDLichSu                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    TrangThaiCu                 VARCHAR(20) NULL,
    TrangThaiMoi                VARCHAR(20) NOT NULL,
    IDNguoiThayDoi              BIGINT NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDNguoiThayDoi) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

/* =========================================================
   8. PHIEN NGUOI DUNG - TIM KIEM - XEM BAI VIET
   ========================================================= */
CREATE TABLE PHIEN_NGUOI_DUNG
(
    IDPhien                     UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    LoaiPhien                   VARCHAR(20) NOT NULL DEFAULT 'KHACH'
                                CHECK (LoaiPhien IN ('KHACH','DA_DANG_NHAP')),
    MaNgonNguUuTien             VARCHAR(10) NULL,
    MaQuocGiaNguoiDung          CHAR(2) NULL,
    LoaiThietBi                 NVARCHAR(50) NULL,
    ThongTinTrinhDuyet          NVARCHAR(255) NULL,
    URLGioiThieu                NVARCHAR(1000) NULL,
    DongYPhanTich               BIT NOT NULL DEFAULT 1,
    BatDauLuc                   DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    KetThucLuc                  DATETIME2(0) NULL,
    FOREIGN KEY (MaNgonNguUuTien) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE NHAT_KY_TIM_KIEM
(
    IDTimKiem                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    TuKhoaTimKiem               NVARCHAR(300) NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    KieuTimKiem                 VARCHAR(20) NOT NULL
                                CHECK (KieuTimKiem IN ('TU_KHOA','NGU_NGHIA','KET_HOP')),
    SoKetQua                    INT NOT NULL DEFAULT 0,
    CoKetQuaPhuHop              BIT NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE NHAT_KY_XEM_BAI_VIET
(
    IDXemBai                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    ThoiDiemXem                 DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    SoGiayXem                   INT NULL CHECK (SoGiayXem IS NULL OR SoGiayXem >= 0),
    NguonTruyCap                VARCHAR(20) NOT NULL DEFAULT 'TRUC_TIEP'
                                CHECK (NguonTruyCap IN ('TRUC_TIEP','TIM_KIEM','BAN_DO','GOI_Y','AI')),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

/* =========================================================
   9. AI CHAT - RAG - DONG BO TRI THUC
   ========================================================= */
CREATE TABLE PHIEN_CHAT_AI
(
    IDPhienChat                 UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    IDPhienNguoiDung            UNIQUEIDENTIFIER NULL,
    MaNgonNguPhien              VARCHAR(10) NULL,
    MaQuocGiaNguoiDung          CHAR(2) NULL,
    TieuDeHoiThoai              NVARCHAR(255) NULL,
    BatDauLuc                   DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    KetThucLuc                  DATETIME2(0) NULL,
    FOREIGN KEY (IDPhienNguoiDung) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (MaNgonNguPhien) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE TIN_NHAN_CHAT_AI
(
    IDTinNhan                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhienChat                 UNIQUEIDENTIFIER NOT NULL,
    LoaiNguoiGui                VARCHAR(20) NOT NULL
                                CHECK (LoaiNguoiGui IN ('NGUOI_DUNG','AI','HE_THONG')),
    ThuTuTinNhan                INT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NULL,
    NoiDungTinNhan              NVARCHAR(MAX) NOT NULL,
    MaYDinh                     VARCHAR(50) NULL,
    DiemTinCay                  DECIMAL(5,4) NULL,
    TraLoiTot                   BIT NULL,
    NgoaiPhamVi                 BIT NOT NULL DEFAULT 0,
    LaNoiDungNhayCam            BIT NOT NULL DEFAULT 0,
    DuCanCuDuLieu               BIT NOT NULL DEFAULT 1,
    ThoiGianPhanHoiMs           INT NULL CHECK (ThoiGianPhanHoiMs IS NULL OR ThoiGianPhanHoiMs >= 0),
    SoPromptToken               INT NULL CHECK (SoPromptToken IS NULL OR SoPromptToken >= 0),
    SoCompletionToken           INT NULL CHECK (SoCompletionToken IS NULL OR SoCompletionToken >= 0),
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDPhienChat, ThuTuTinNhan),
    FOREIGN KEY (IDPhienChat) REFERENCES PHIEN_CHAT_AI(IDPhienChat),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu)
);
GO

CREATE TABLE CAU_HOI_CAN_BO_SUNG
(
    IDCauHoiCanBoSung           BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTinNhan                   BIGINT NOT NULL,
    LyDo                        VARCHAR(30) NOT NULL
                                CHECK (LyDo IN ('THIEU_DU_LIEU','DO_TIN_CAY_THAP','MAU_THUAN_DU_LIEU','NGOAI_PHAM_VI','NHAY_CAM')),
    GoiYXuLy                    NVARCHAR(500) NULL,
    TrangThai                   VARCHAR(20) NOT NULL DEFAULT 'MOI'
                                CHECK (TrangThai IN ('MOI','DANG_XEM_XET','DA_XU_LY','BO_QUA')),
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    NgayXuLy                    DATETIME2(0) NULL,
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan)
);
GO

CREATE TABLE DOT_DONG_BO_TRI_THUC_AI
(
    IDDotDongBo                 BIGINT IDENTITY(1,1) PRIMARY KEY,
    LoaiDongBo                  VARCHAR(30) NOT NULL
                                CHECK (LoaiDongBo IN ('TOAN_BO','TANG_DAN','XAY_LAI_VECTOR')),
    TrangThai                   VARCHAR(20) NOT NULL
                                CHECK (TrangThai IN ('CHO_XU_LY','DANG_CHAY','THANH_CONG','THAT_BAI','MOT_PHAN')),
    BatDauLuc                   DATETIME2(0) NULL,
    KetThucLuc                  DATETIME2(0) NULL,
    IDNguoiKichHoat             BIGINT NULL,
    ThongBaoLoi                 NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDNguoiKichHoat) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

CREATE TABLE CHI_TIET_DONG_BO_TRI_THUC_AI
(
    IDChiTietDongBo             BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDDotDongBo                 BIGINT NOT NULL,
    IDBaiViet                   BIGINT NOT NULL,
    TrangThai                   VARCHAR(20) NOT NULL
                                CHECK (TrangThai IN ('CHO_XU_LY','DANG_XU_LY','THANH_CONG','THAT_BAI')),
    SoDoanChunk                 INT NULL CHECK (SoDoanChunk IS NULL OR SoDoanChunk >= 0),
    ThongBaoLoi                 NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDDotDongBo) REFERENCES DOT_DONG_BO_TRI_THUC_AI(IDDotDongBo),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet)
);
GO

CREATE TABLE TAI_LIEU_TRI_THUC_AI
(
    IDTaiLieuTriThuc            BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDBaiViet                   BIGINT NOT NULL,
    MaNgonNgu                   VARCHAR(10) NOT NULL,
    IDPhienBan                  BIGINT NULL,
    TieuDeTaiLieu               NVARCHAR(300) NOT NULL,
    MetadataJson                NVARCHAR(MAX) NULL,
    HoatDong                    BIT NOT NULL DEFAULT 1,
    NhaCungCapEmbedding         NVARCHAR(100) NULL,
    NgayEmbedding               DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (MaNgonNgu) REFERENCES NGON_NGU(MaNgonNgu),
    FOREIGN KEY (IDPhienBan) REFERENCES PHIEN_BAN_BAI_VIET(IDPhienBan)
);
GO

CREATE TABLE DOAN_TRI_THUC_AI
(
    IDDoan                      BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTaiLieuTriThuc            BIGINT NOT NULL,
    SoThuTuDoan                 INT NOT NULL,
    NoiDungDoan                 NVARCHAR(MAX) NOT NULL,
    SoToken                     INT NULL CHECK (SoToken IS NULL OR SoToken >= 0),
    KhoaEmbedding               NVARCHAR(255) NULL,
    MetadataJson                NVARCHAR(MAX) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    UNIQUE (IDTaiLieuTriThuc, SoThuTuDoan),
    FOREIGN KEY (IDTaiLieuTriThuc) REFERENCES TAI_LIEU_TRI_THUC_AI(IDTaiLieuTriThuc)
);
GO

CREATE TABLE TRICH_DAN_TIN_NHAN_AI
(
    IDTrichDan                  BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDTinNhan                   BIGINT NOT NULL,
    IDTaiLieuTriThuc            BIGINT NOT NULL,
    IDDoan                      BIGINT NULL,
    ThuTuTrichDan               INT NOT NULL DEFAULT 1,
    DoanTrichYeu                NVARCHAR(1000) NULL,
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan),
    FOREIGN KEY (IDTaiLieuTriThuc) REFERENCES TAI_LIEU_TRI_THUC_AI(IDTaiLieuTriThuc),
    FOREIGN KEY (IDDoan) REFERENCES DOAN_TRI_THUC_AI(IDDoan)
);
GO

/* =========================================================
   10. PHAN HOI NGUOI DUNG
   ========================================================= */
CREATE TABLE PHAN_HOI_NOI_DUNG
(
    IDPhanHoi                   BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDPhien                     UNIQUEIDENTIFIER NULL,
    LoaiPhanHoi                 VARCHAR(20) NOT NULL
                                CHECK (LoaiPhanHoi IN ('BAI_VIET','TRA_LOI_AI','CHUNG')),
    IDBaiViet                   BIGINT NULL,
    IDTinNhan                   BIGINT NULL,
    DiemDanhGia                 TINYINT NULL CHECK (DiemDanhGia BETWEEN 1 AND 5),
    HuuIch                      BIT NULL,
    NoiDungPhanHoi              NVARCHAR(2000) NULL,
    TrangThaiXuLy               VARCHAR(20) NOT NULL DEFAULT 'MOI'
                                CHECK (TrangThaiXuLy IN ('MOI','DA_XEM','DA_XU_LY','TU_CHOI')),
    IDNguoiXuLy                 BIGINT NULL,
    NgayXuLy                    DATETIME2(0) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDPhien) REFERENCES PHIEN_NGUOI_DUNG(IDPhien),
    FOREIGN KEY (IDBaiViet) REFERENCES BAI_VIET(IDBaiViet),
    FOREIGN KEY (IDTinNhan) REFERENCES TIN_NHAN_CHAT_AI(IDTinNhan),
    FOREIGN KEY (IDNguoiXuLy) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung),
    CHECK (
        (LoaiPhanHoi = 'BAI_VIET' AND IDBaiViet IS NOT NULL)
        OR
        (LoaiPhanHoi = 'TRA_LOI_AI' AND IDTinNhan IS NOT NULL)
        OR
        (LoaiPhanHoi = 'CHUNG')
    )
);
GO

/* =========================================================
   11. NHAT KY QUAN TRI
   ========================================================= */
CREATE TABLE NHAT_KY_QUAN_TRI
(
    IDNhatKy                    BIGINT IDENTITY(1,1) PRIMARY KEY,
    IDNguoiDung                 BIGINT NOT NULL,
    LoaiHanhDong                VARCHAR(50) NOT NULL,
    TenThucThe                  VARCHAR(100) NOT NULL,
    GiaTriKhoa                  NVARCHAR(100) NOT NULL,
    DuLieuCuJson                NVARCHAR(MAX) NULL,
    DuLieuMoiJson               NVARCHAR(MAX) NULL,
    GhiChu                      NVARCHAR(1000) NULL,
    NgayTao                     DATETIME2(0) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (IDNguoiDung) REFERENCES QUAN_TRI_NGUOI_DUNG(IDNguoiDung)
);
GO

/* =========================================================
   12. INDEX
   ========================================================= */
CREATE INDEX IX_BAI_VIET_TrangThai ON BAI_VIET(TrangThai);
GO
CREATE INDEX IX_BAI_VIET_TrangThaiDongBoAI ON BAI_VIET(TrangThaiDongBoAI);
GO
CREATE INDEX IX_BAI_VIET_NgayTao ON BAI_VIET(NgayTao);
GO
CREATE INDEX IX_BAI_VIET_BAN_DICH_IDBaiViet_MaNgonNgu ON BAI_VIET_BAN_DICH(IDBaiViet, MaNgonNgu);
GO
CREATE INDEX IX_BAI_VIET_DANH_MUC_IDDanhMuc ON BAI_VIET_DANH_MUC(IDDanhMuc);
GO
CREATE INDEX IX_BAI_VIET_VUNG_VAN_HOA_IDVung ON BAI_VIET_VUNG_VAN_HOA(IDVung);
GO
CREATE INDEX IX_BAI_VIET_DAN_TOC_IDDanToc ON BAI_VIET_DAN_TOC(IDDanToc);
GO
CREATE INDEX IX_BAI_VIET_THE_IDThe ON BAI_VIET_THE(IDThe);
GO
CREATE INDEX IX_BAI_VIET_TU_KHOA_IDTuKhoa ON BAI_VIET_TU_KHOA(IDTuKhoa);
GO
CREATE INDEX IX_BAI_VIET_NGUON_IDNguon ON BAI_VIET_NGUON_THAM_KHAO(IDNguon);
GO
CREATE INDEX IX_BAI_VIET_LIEN_QUAN_IDBaiVietLienQuan ON BAI_VIET_LIEN_QUAN(IDBaiVietLienQuan);
GO
CREATE INDEX IX_BAI_VIET_MEDIA_IDMedia ON BAI_VIET_MEDIA(IDMedia);
GO
CREATE INDEX IX_MEDIA_VUNG_VAN_HOA_IDVung ON MEDIA_VUNG_VAN_HOA(IDVung);
GO
CREATE INDEX IX_MEDIA_DAN_TOC_IDDanToc ON MEDIA_DAN_TOC(IDDanToc);
GO
CREATE UNIQUE INDEX UX_NGON_NGU_MAC_DINH ON NGON_NGU(LaMacDinh) WHERE LaMacDinh = 1;
GO
CREATE INDEX IX_TAI_LIEU_TRI_THUC_AI_IDBaiViet_MaNgonNgu ON TAI_LIEU_TRI_THUC_AI(IDBaiViet, MaNgonNgu);
GO
CREATE INDEX IX_MEDIA_TrangThai ON MEDIA(TrangThai);
GO
CREATE INDEX IX_PHIEN_BAN_BAI_VIET_IDBaiViet ON PHIEN_BAN_BAI_VIET(IDBaiViet, SoPhienBan DESC);
GO
CREATE INDEX IX_LICH_SU_TRANG_THAI_BAI_VIET_IDBaiViet ON LICH_SU_TRANG_THAI_BAI_VIET(IDBaiViet, NgayTao DESC);
GO
CREATE INDEX IX_NHAT_KY_TIM_KIEM_NgayTao ON NHAT_KY_TIM_KIEM(NgayTao);
GO
CREATE INDEX IX_NHAT_KY_XEM_BAI_VIET_ThoiDiemXem ON NHAT_KY_XEM_BAI_VIET(ThoiDiemXem);
GO
CREATE INDEX IX_TIN_NHAN_CHAT_AI_IDPhienChat ON TIN_NHAN_CHAT_AI(IDPhienChat, ThuTuTinNhan);
GO
CREATE INDEX IX_CAU_HOI_CAN_BO_SUNG_TrangThai ON CAU_HOI_CAN_BO_SUNG(TrangThai, NgayTao);
GO
CREATE INDEX IX_PHAN_HOI_NOI_DUNG_TrangThaiXuLy ON PHAN_HOI_NOI_DUNG(TrangThaiXuLy, NgayTao);
GO
CREATE INDEX IX_CHI_TIET_DONG_BO_AI_IDBaiViet ON CHI_TIET_DONG_BO_TRI_THUC_AI(IDBaiViet, NgayTao);
GO
CREATE INDEX IX_DOAN_TRI_THUC_AI_IDTaiLieuTriThuc ON DOAN_TRI_THUC_AI(IDTaiLieuTriThuc, SoThuTuDoan);
GO

/* =========================================================
   13. HAM TAO SNAPSHOT JSON CHO PHIEN BAN
   ========================================================= */
CREATE OR ALTER FUNCTION dbo.FN_SNAPSHOT_BAI_VIET
(
    @IDBaiViet BIGINT
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Json NVARCHAR(MAX);

    SELECT @Json =
    (
        SELECT
            b.IDBaiViet,
            b.DuongDanSeo,
            b.MaNgonNguGoc,
            b.LoaiBaiViet,
            b.TrangThai,
            b.CapDoNhayCam,
            b.MucDoKiemDuyet,
            b.NoiDungNoiBat,
            b.TrangThaiDongBoAI,
            b.NgayDuyet,
            b.NgayXuatBan,
            b.IDNguoiTao,
            b.IDNguoiCapNhat,
            b.NgayTao,
            b.NgayCapNhat,
            JSON_QUERY((
                SELECT
                    bd.IDBanDich,
                    bd.MaNgonNgu,
                    bd.TieuDe,
                    bd.TomTat,
                    bd.GioiThieu,
                    bd.NguonGoc,
                    bd.YNghiaVanHoa,
                    bd.BoiCanhSuDung,
                    bd.NoiDungChiTiet,
                    bd.GhiChuCultureShock,
                    bd.TrangThaiBanDich,
                    bd.LaBanDichMay,
                    bd.IDNguoiSoat,
                    bd.NgaySoat
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanhSachBanDich,
            JSON_QUERY((
                SELECT IDDanhMuc, LaDanhMucChinh
                FROM BAI_VIET_DANH_MUC x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanhMuc,
            JSON_QUERY((
                SELECT IDVung, LoaiLienHe
                FROM BAI_VIET_VUNG_VAN_HOA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS VungVanHoa,
            JSON_QUERY((
                SELECT IDDanToc, LoaiLienHe
                FROM BAI_VIET_DAN_TOC x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS DanToc,
            JSON_QUERY((
                SELECT IDThe
                FROM BAI_VIET_THE x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS TheNoiDung,
            JSON_QUERY((
                SELECT IDTuKhoa
                FROM BAI_VIET_TU_KHOA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS TuKhoa,
            JSON_QUERY((
                SELECT IDNguon, LaNguonChinh, GhiChuTrichDan, TrangTu, TrangDen
                FROM BAI_VIET_NGUON_THAM_KHAO x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS NguonThamKhao,
            JSON_QUERY((
                SELECT IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung
                FROM BAI_VIET_MEDIA x
                WHERE x.IDBaiViet = b.IDBaiViet
                FOR JSON PATH
            )) AS Media
        FROM BAI_VIET b
        WHERE b.IDBaiViet = @IDBaiViet
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );

    RETURN @Json;
END;
GO

/* =========================================================
   14. VALIDATE BAN DICH DUOC SOAT
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_VALIDATE_SOAT
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThaiBanDich IN ('DA_SOAT','DA_DUYET','DA_XUAT_BAN')
          AND (i.IDNguoiSoat IS NULL OR i.NgaySoat IS NULL)
    )
    BEGIN
        RAISERROR(N'Ban dich o trang thai da soat/da duyet/xuat ban phai co nguoi soat va ngay soat.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          AND (
                LEN(LTRIM(RTRIM(ISNULL(i.TieuDe, N'')))) = 0
                OR LEN(LTRIM(RTRIM(ISNULL(i.NoiDungChiTiet, N'')))) = 0
              )
    )
    BEGIN
        RAISERROR(N'Ban dich da duyet/xuat ban phai co tieu de va noi dung chi tiet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   15. TRIGGER SET NgayCapNhat
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_QUAN_TRI_NGUOI_DUNG_SET_NGAYCAPNHAT
ON QUAN_TRI_NGUOI_DUNG
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE u
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM QUAN_TRI_NGUOI_DUNG u
    INNER JOIN inserted i ON u.IDNguoiDung = i.IDNguoiDung;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_SET_NGAYCAPNHAT
ON BAI_VIET
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE b
    SET
        NgayCapNhat = SYSUTCDATETIME(),
        MucDoKiemDuyet = CASE WHEN b.CapDoNhayCam >= 4 THEN 'CHAT' ELSE b.MucDoKiemDuyet END
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_SET_NGAYCAPNHAT
ON BAI_VIET_BAN_DICH
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE bd
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM BAI_VIET_BAN_DICH bd
    INNER JOIN inserted i ON bd.IDBanDich = i.IDBanDich;
END;
GO

CREATE OR ALTER TRIGGER TRG_MEDIA_SET_NGAYCAPNHAT
ON MEDIA
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    UPDATE m
    SET NgayCapNhat = SYSUTCDATETIME()
    FROM MEDIA m
    INNER JOIN inserted i ON m.IDMedia = i.IDMedia;
END;
GO

/* =========================================================
   16. TRIGGER LUU LICH SU TRANG THAI
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_LUU_LICH_SU_TRANG_THAI
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    INSERT INTO LICH_SU_TRANG_THAI_BAI_VIET
    (
        IDBaiViet,
        TrangThaiCu,
        TrangThaiMoi,
        IDNguoiThayDoi,
        GhiChu
    )
    SELECT
        i.IDBaiViet,
        d.TrangThai,
        i.TrangThai,
        COALESCE(i.IDNguoiCapNhat, i.IDNguoiTao),
        NULL
    FROM inserted i
    LEFT JOIN deleted d
        ON i.IDBaiViet = d.IDBaiViet
    WHERE d.IDBaiViet IS NULL
       OR ISNULL(d.TrangThai, '') <> ISNULL(i.TrangThai, '');
END;
GO

/* =========================================================
   17. TRIGGER TAO PHIEN BAN
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_TAO_PHIEN_BAN
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    INSERT INTO PHIEN_BAN_BAI_VIET
    (
        IDBaiViet,
        SoPhienBan,
        LoaiThayDoi,
        TomTatThayDoi,
        DuLieuSnapshotJson,
        TrangThaiPhienBan,
        IDNguoiGuiDuyet,
        NgayGuiDuyet,
        IDNguoiDuyet,
        NgayDuyet,
        IDNguoiXuatBan,
        NgayXuatBan
    )
    SELECT
        i.IDBaiViet,
        ISNULL((SELECT MAX(v.SoPhienBan) FROM PHIEN_BAN_BAI_VIET v WHERE v.IDBaiViet = i.IDBaiViet), 0) + 1,
        CASE
            WHEN d.IDBaiViet IS NULL THEN 'TAO_MOI'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'CHO_DUYET' THEN 'GUI_DUYET'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'DA_DUYET' THEN 'DUYET'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'DA_XUAT_BAN' THEN 'XUAT_BAN'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'AN' THEN 'AN'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'LUU_TRU' THEN 'LUU_TRU'
            WHEN d.TrangThai <> i.TrangThai AND i.TrangThai = 'TU_CHOI' THEN 'TU_CHOI'
            ELSE 'CAP_NHAT'
        END,
        NULL,
        dbo.FN_SNAPSHOT_BAI_VIET(i.IDBaiViet),
        CASE
            WHEN i.TrangThai = 'NHAP' THEN 'NHAP'
            WHEN i.TrangThai = 'CHO_DUYET' THEN 'CHO_DUYET'
            WHEN i.TrangThai = 'DA_DUYET' THEN 'DA_DUYET'
            WHEN i.TrangThai = 'DA_XUAT_BAN' THEN 'DA_XUAT_BAN'
            WHEN i.TrangThai = 'AN' THEN 'AN'
            WHEN i.TrangThai = 'LUU_TRU' THEN 'LUU_TRU'
            ELSE 'TU_CHOI'
        END,
        CASE WHEN i.TrangThai = 'CHO_DUYET' THEN COALESCE(i.IDNguoiCapNhat, i.IDNguoiTao) END,
        CASE WHEN i.TrangThai = 'CHO_DUYET' THEN SYSUTCDATETIME() END,
        i.IDNguoiDuyet,
        i.NgayDuyet,
        i.IDNguoiXuatBan,
        i.NgayXuatBan
    FROM inserted i
    LEFT JOIN deleted d ON i.IDBaiViet = d.IDBaiViet;
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_TAO_PHIEN_BAN
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    IF TRIGGER_NESTLEVEL() > 1 RETURN;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    INSERT INTO PHIEN_BAN_BAI_VIET
    (
        IDBaiViet,
        SoPhienBan,
        LoaiThayDoi,
        TomTatThayDoi,
        DuLieuSnapshotJson,
        TrangThaiPhienBan
    )
    SELECT
        c.IDBaiViet,
        ISNULL((SELECT MAX(v.SoPhienBan) FROM PHIEN_BAN_BAI_VIET v WHERE v.IDBaiViet = c.IDBaiViet), 0) + 1,
        'CAP_NHAT_BAN_DICH',
        N'Cap nhat ban dich bai viet',
        dbo.FN_SNAPSHOT_BAI_VIET(c.IDBaiViet),
        CASE b.TrangThai
            WHEN 'NHAP' THEN 'NHAP'
            WHEN 'CHO_DUYET' THEN 'CHO_DUYET'
            WHEN 'DA_DUYET' THEN 'DA_DUYET'
            WHEN 'DA_XUAT_BAN' THEN 'DA_XUAT_BAN'
            WHEN 'AN' THEN 'AN'
            WHEN 'LUU_TRU' THEN 'LUU_TRU'
            ELSE 'TU_CHOI'
        END
    FROM CTE c
    INNER JOIN BAI_VIET b ON b.IDBaiViet = c.IDBaiViet;
END;
GO

/* =========================================================
   18. TRIGGER VALIDATE XUAT BAN
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_VALIDATE_XUAT_BAN
ON BAI_VIET
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND (i.IDNguoiDuyet IS NULL OR i.NgayDuyet IS NULL OR i.IDNguoiXuatBan IS NULL OR i.NgayXuatBan IS NULL)
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co thong tin duyet va xuat ban.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_DANH_MUC x WHERE x.IDBaiViet = i.IDBaiViet
          )
    )
    BEGIN
        RAISERROR(N'Moi bai viet xuat ban phai thuoc it nhat mot danh muc.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_VUNG_VAN_HOA x WHERE x.IDBaiViet = i.IDBaiViet
                UNION ALL
                SELECT 1 FROM BAI_VIET_DAN_TOC y WHERE y.IDBaiViet = i.IDBaiViet
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai gan it nhat mot vung van hoa hoac mot dan toc.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu = 'vi'
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co ban dich tieng Viet da duyet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu = 'en'
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co ban dich tieng Anh da duyet.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND NOT EXISTS (
                SELECT 1
                FROM BAI_VIET_NGUON_THAM_KHAO x
                INNER JOIN NGUON_THAM_KHAO n ON n.IDNguon = x.IDNguon
                WHERE x.IDBaiViet = i.IDBaiViet
                  AND n.DaXacMinh = 1
                  AND n.MucDoTinCay >= 3
          )
    )
    BEGIN
        RAISERROR(N'Bai viet xuat ban phai co it nhat mot nguon tham khao da xac minh va du tin cay.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND EXISTS (
                SELECT 1
                FROM BAI_VIET_BAN_DICH bd
                WHERE bd.IDBaiViet = i.IDBaiViet
                  AND bd.MaNgonNgu IN ('vi','en')
                  AND bd.TrangThaiBanDich IN ('DA_DUYET','DA_XUAT_BAN')
                  AND (bd.IDNguoiSoat IS NULL OR bd.NgaySoat IS NULL)
          )
    )
    BEGIN
        RAISERROR(N'Ban dich duoc duyet/xuat ban phai co thong tin nguoi soat.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'DA_XUAT_BAN'
          AND i.CapDoNhayCam >= 4
          AND i.MucDoKiemDuyet <> 'CHAT'
    )
    BEGIN
        RAISERROR(N'Noi dung nhay cam cao phai duoc danh dau muc do kiem duyet CHAT.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   19. TRIGGER MEDIA ACTIVE PHAI GAN BAI VIET/THUC THE
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_MEDIA_VALIDATE_HOAT_DONG
ON MEDIA
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM inserted i
        WHERE i.TrangThai = 'HOAT_DONG'
          AND NOT EXISTS (
                SELECT 1 FROM BAI_VIET_MEDIA bm WHERE bm.IDMedia = i.IDMedia
                UNION ALL
                SELECT 1 FROM MEDIA_VUNG_VAN_HOA mv WHERE mv.IDMedia = i.IDMedia
                UNION ALL
                SELECT 1 FROM MEDIA_DAN_TOC md WHERE md.IDMedia = i.IDMedia
          )
    )
    BEGIN
        RAISERROR(N'Media o trang thai HOAT_DONG phai duoc gan voi it nhat mot bai viet hoac thuc the van hoa.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;
GO

/* =========================================================
   20. TRIGGER DANH DAU CAN DONG BO AI KHI SUA NOI DUNG
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_BAI_VIET_BAN_DICH_MARK_SYNC_PENDING
ON BAI_VIET_BAN_DICH
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET
        CanDongBoAI = 1,
        TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_METADATA_MARK_SYNC_PENDING
ON BAI_VIET
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT (
        UPDATE(DuongDanSeo) OR
        UPDATE(LoaiBaiViet) OR
        UPDATE(CapDoNhayCam) OR
        UPDATE(NoiDungNoiBat) OR
        UPDATE(GhiChuBienTap)
    )
        RETURN;

    UPDATE b
    SET
        CanDongBoAI = 1,
        TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_DANH_MUC_MARK_SYNC_PENDING
ON BAI_VIET_DANH_MUC
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_VUNG_MARK_SYNC_PENDING
ON BAI_VIET_VUNG_VAN_HOA
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_DAN_TOC_MARK_SYNC_PENDING
ON BAI_VIET_DAN_TOC
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_THE_MARK_SYNC_PENDING
ON BAI_VIET_THE
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_NGUON_MARK_SYNC_PENDING
ON BAI_VIET_NGUON_THAM_KHAO
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_LIEN_QUAN_MARK_SYNC_PENDING
ON BAI_VIET_LIEN_QUAN
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiVietLienQuan FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
        UNION
        SELECT DISTINCT IDBaiVietLienQuan FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_BAI_VIET_MEDIA_MARK_SYNC_PENDING
ON BAI_VIET_MEDIA
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH CTE AS
    (
        SELECT DISTINCT IDBaiViet FROM inserted
        UNION
        SELECT DISTINCT IDBaiViet FROM deleted
    )
    UPDATE b
    SET CanDongBoAI = 1, TrangThaiDongBoAI = 'CHO_DONG_BO'
    FROM BAI_VIET b
    INNER JOIN CTE c ON b.IDBaiViet = c.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN';
END;
GO

CREATE OR ALTER TRIGGER TRG_PHIEN_BAN_CAP_NHAT_HIEN_TAI_XUAT_BAN
ON PHIEN_BAN_BAI_VIET
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH LatestPublished AS
    (
        SELECT i.IDBaiViet, MAX(i.IDPhienBan) AS IDPhienBanMoiNhat
        FROM inserted i
        WHERE i.TrangThaiPhienBan = 'DA_XUAT_BAN'
        GROUP BY i.IDBaiViet
    )
    UPDATE b
    SET IDPhienBanXuatBanHienTai = lp.IDPhienBanMoiNhat
    FROM BAI_VIET b
    INNER JOIN LatestPublished lp ON b.IDBaiViet = lp.IDBaiViet;
END;
GO

/* =========================================================
   21. TRIGGER CAP NHAT TRANG THAI AI SAU DONG BO
   ========================================================= */
CREATE OR ALTER TRIGGER TRG_CHI_TIET_DONG_BO_AI_CAP_NHAT_BAI_VIET
ON CHI_TIET_DONG_BO_TRI_THUC_AI
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE b
    SET
        TrangThaiDongBoAI = CASE
            WHEN i.TrangThai = 'THANH_CONG' THEN 'SAN_SANG'
            WHEN i.TrangThai = 'THAT_BAI' THEN 'LOI'
            WHEN i.TrangThai = 'DANG_XU_LY' THEN 'DANG_DONG_BO'
            ELSE b.TrangThaiDongBoAI
        END,
        CanDongBoAI = CASE WHEN i.TrangThai = 'THANH_CONG' THEN 0 ELSE b.CanDongBoAI END
    FROM BAI_VIET b
    INNER JOIN inserted i ON b.IDBaiViet = i.IDBaiViet;
END;
GO

/* =========================================================
   22. DU LIEU MAU CO BAN
   ========================================================= */
INSERT INTO NGON_NGU (MaNgonNgu, TenNgonNgu, TenBanDia, LaMacDinh, HoatDong)
VALUES
('vi', N'Tiếng Việt', N'Tiếng Việt', 1, 1),
('en', N'English', N'English', 0, 1);
GO

INSERT INTO QUAN_TRI_VAI_TRO (MaVaiTro, TenVaiTro, MoTa)
VALUES
('SUPER_ADMIN', N'Quản trị hệ thống', N'Toàn quyền hệ thống'),
('CONTENT_ADMIN', N'Quản trị nội dung', N'Quản lý bài viết, media, danh mục'),
('REVIEWER', N'Kiểm duyệt nội dung', N'Kiểm duyệt nội dung trước khi công khai'),
('AI_ADMIN', N'Quản trị AI', N'Giám sát kho tri thức và pipeline AI'),
('ANALYST', N'Phân tích dữ liệu', N'Xem dashboard và thống kê');
GO

INSERT INTO QUAN_TRI_QUYEN (MaQuyen, TenQuyen, MoTa)
VALUES
('ARTICLE_CREATE', N'Tạo bài viết', N'Thêm mới bài viết'),
('ARTICLE_EDIT', N'Sửa bài viết', N'Chỉnh sửa bài viết'),
('ARTICLE_REVIEW', N'Duyệt bài viết', N'Duyệt hoặc từ chối bài viết'),
('ARTICLE_PUBLISH', N'Xuất bản bài viết', N'Xuất bản hoặc ẩn bài viết'),
('TAXONOMY_MANAGE', N'Quản lý taxonomy', N'Quản lý danh mục, vùng, dân tộc, thẻ, từ khoá'),
('MEDIA_MANAGE', N'Quản lý media', N'Tải lên và gắn media'),
('AI_SYNC_MANAGE', N'Quản lý đồng bộ AI', N'Kích hoạt hoặc giám sát đồng bộ dữ liệu AI'),
('DASHBOARD_VIEW', N'Xem dashboard', N'Xem dashboard và thống kê'),
('FEEDBACK_HANDLE', N'Xử lý phản hồi', N'Xem và xử lý phản hồi người dùng'),
('USER_ROLE_MANAGE', N'Quản lý người dùng và vai trò', N'Gán vai trò và phân quyền');
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
CROSS JOIN QUAN_TRI_QUYEN p
WHERE r.MaVaiTro = 'SUPER_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('ARTICLE_CREATE','ARTICLE_EDIT','TAXONOMY_MANAGE','MEDIA_MANAGE','FEEDBACK_HANDLE')
WHERE r.MaVaiTro = 'CONTENT_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('ARTICLE_REVIEW','ARTICLE_PUBLISH','DASHBOARD_VIEW')
WHERE r.MaVaiTro = 'REVIEWER';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('AI_SYNC_MANAGE','DASHBOARD_VIEW')
WHERE r.MaVaiTro = 'AI_ADMIN';
GO

INSERT INTO QUAN_TRI_VAI_TRO_QUYEN (IDVaiTro, IDQuyen)
SELECT r.IDVaiTro, p.IDQuyen
FROM QUAN_TRI_VAI_TRO r
INNER JOIN QUAN_TRI_QUYEN p ON p.MaQuyen IN ('DASHBOARD_VIEW','FEEDBACK_HANDLE')
WHERE r.MaVaiTro = 'ANALYST';
GO

INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, ThuTuSapXep, HoatDong)
VALUES
('LE_HOI', 1, 1),
('TIN_NGUONG', 2, 1),
('PHONG_TUC', 3, 1),
('AM_THUC', 4, 1),
('TRANG_PHUC', 5, 1),
('NGHE_THUAT_DAN_GIAN', 6, 1),
('KIEN_TRUC', 7, 1),
('BIEU_TUONG_VAN_HOA', 8, 1);
GO

INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
SELECT IDDanhMuc, 'vi',
       CASE MaDanhMuc
            WHEN 'LE_HOI' THEN N'Lễ hội'
            WHEN 'TIN_NGUONG' THEN N'Tín ngưỡng'
            WHEN 'PHONG_TUC' THEN N'Phong tục'
            WHEN 'AM_THUC' THEN N'Ẩm thực'
            WHEN 'TRANG_PHUC' THEN N'Trang phục'
            WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Nghệ thuật dân gian'
            WHEN 'KIEN_TRUC' THEN N'Kiến trúc'
            WHEN 'BIEU_TUONG_VAN_HOA' THEN N'Biểu tượng văn hoá'
       END,
       NULL
FROM DANH_MUC_CHU_DE;
GO

INSERT INTO DANH_MUC_CHU_DE_BAN_DICH (IDDanhMuc, MaNgonNgu, TenDanhMuc, MoTa)
SELECT IDDanhMuc, 'en',
       CASE MaDanhMuc
            WHEN 'LE_HOI' THEN N'Festival'
            WHEN 'TIN_NGUONG' THEN N'Belief'
            WHEN 'PHONG_TUC' THEN N'Custom'
            WHEN 'AM_THUC' THEN N'Cuisine'
            WHEN 'TRANG_PHUC' THEN N'Traditional Clothing'
            WHEN 'NGHE_THUAT_DAN_GIAN' THEN N'Folk Art'
            WHEN 'KIEN_TRUC' THEN N'Traditional Architecture'
            WHEN 'BIEU_TUONG_VAN_HOA' THEN N'Cultural Symbol'
       END,
       NULL
FROM DANH_MUC_CHU_DE;
GO

INSERT INTO VUNG_VAN_HOA (MaVung, IDVungCha, LoaiVung, DuLieuBanDoGeoJson, ThuTuSapXep, HoatDong)
VALUES
('MIEN_BAC', NULL, 'VAN_HOA', NULL, 1, 1),
('MIEN_TRUNG', NULL, 'VAN_HOA', NULL, 2, 1),
('MIEN_NAM', NULL, 'VAN_HOA', NULL, 3, 1),
('TAY_NGUYEN', NULL, 'VAN_HOA', NULL, 4, 1),
('DONG_BANG_SONG_CUU_LONG', NULL, 'VAN_HOA', NULL, 5, 1);
GO

INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
SELECT IDVung, 'vi',
       CASE MaVung
            WHEN 'MIEN_BAC' THEN N'Miền Bắc'
            WHEN 'MIEN_TRUNG' THEN N'Miền Trung'
            WHEN 'MIEN_NAM' THEN N'Miền Nam'
            WHEN 'TAY_NGUYEN' THEN N'Tây Nguyên'
            WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Đồng bằng sông Cửu Long'
       END,
       NULL
FROM VUNG_VAN_HOA;
GO

INSERT INTO VUNG_VAN_HOA_BAN_DICH (IDVung, MaNgonNgu, TenVung, MoTa)
SELECT IDVung, 'en',
       CASE MaVung
            WHEN 'MIEN_BAC' THEN N'Northern Region'
            WHEN 'MIEN_TRUNG' THEN N'Central Region'
            WHEN 'MIEN_NAM' THEN N'Southern Region'
            WHEN 'TAY_NGUYEN' THEN N'Central Highlands'
            WHEN 'DONG_BANG_SONG_CUU_LONG' THEN N'Mekong Delta'
       END,
       NULL
FROM VUNG_VAN_HOA;
GO

/* =========================================================
   23. GHI CHU
   =========================================================
   - BAI_VIET la bang trung tam cua kho tri thuc.
   - BAI_VIET_BAN_DICH luu noi dung song ngu va trang thai soat/duyet.
   - PHIEN_BAN_BAI_VIET + LICH_SU_TRANG_THAI_BAI_VIET phuc vu BR17.
   - NGUON_THAM_KHAO + BAI_VIET_NGUON_THAM_KHAO phuc vu BR12.
   - DOT_DONG_BO_TRI_THUC_AI / TAI_LIEU_TRI_THUC_AI / DOAN_TRI_THUC_AI phuc vu RAG.
   - PHIEN_CHAT_AI / TIN_NHAN_CHAT_AI / TRICH_DAN_TIN_NHAN_AI / CAU_HOI_CAN_BO_SUNG phuc vu AI co kiem soat.
   - PHAN_HOI_NOI_DUNG / NHAT_KY_TIM_KIEM / NHAT_KY_XEM_BAI_VIET / NHAT_KY_QUAN_TRI phuc vu dashboard va cai tien lien tuc.
   ========================================================= */

